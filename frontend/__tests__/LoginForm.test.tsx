import {
  screen,
  render,
  renderHook,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { useAuth } from "../hooks/auth/useAuth";
import { useUserAuthStore } from "store/useUserAuthStore";
import { useVerifyToken } from "@hooks/auth/useVerifyToken";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "pages";
import { useLocalStorage } from "@hooks/utility/useLocalStorage";

const queryClient = new QueryClient();

const wrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const { result } = renderHook(() => useLocalStorage());
const { getItem, setItem } = result.current;
//test case 1
// test("Form validation", () => {
//   const { result } = renderHook(() => useAuth());
//   const { handleValidation, dispatch, state } = result.current;

//   act(() => {
//     dispatch({ type: "SET_EMAIL", payload: "abc@gmail.com" });
//     dispatch({ type: "SET_PASSWORD", payload: "lydiaWu" });

//     dispatch({ type: "VALIDATE" });
//   });

//   const isValid = handleValidation("login");
//   expect(isValid).toBe(false);
// });

// //test case 2
// test("Form validation", () => {
//   const { result } = renderHook(() => useAuth());
//   const { dispatch } = result.current;

//   act(() => {
//     dispatch({ type: "SET_EMAIL", payload: "abc@gmail.com" });
//     dispatch({ type: "SET_PASSWORD", payload: "lydiaWu12345" });
//     dispatch({ type: "SET_USER_NAME", payload: "lydia" });

//     dispatch({ type: "VALIDATE" });
//   });
//   const { handleValidation, state } = result.current;

//   const isValid = handleValidation("signup");
//   expect(isValid).toBe(true);
// });

describe("Test side effect of login", () => {
  const { result } = renderHook(() => useAuth());
  const { result: store } = renderHook(() => useUserAuthStore());
  const { dispatch } = result.current;

  it("should correctly set tokens in localStorage", async () => {
    act(() => {
      dispatch({ type: "SET_EMAIL", payload: "abc@gmail.com" });
      dispatch({ type: "SET_PASSWORD", payload: "lydiaWu12345" });
      dispatch({ type: "VALIDATE" });
    });

    const { handleSubmitForm } = result.current;

    await act(async () => {
      await handleSubmitForm("login");
    });
    const tokensInLocalStorage = JSON.parse(localStorage.getItem("tokens")!);
    expect(tokensInLocalStorage).toHaveProperty("access_token");
    expect(tokensInLocalStorage).toHaveProperty("refresh_token");
  });

  it("should update global store correctly after login", async () => {
    const { loginInfo, userInfo } = store.current;
    expect(loginInfo.isLoggedIn).toBe(true);
    expect(loginInfo.isGoogleLogin).toBe(false);

    expect(userInfo.email).toEqual("abc@gmail.com");
  });

  it("Should rotate access token once it expires", async () => {
    const { result } = renderHook(() => useVerifyToken(), { wrapper });

    await waitFor(() => result.current?.data);
    const { data, isExpired, isRefetching } = result.current!;
    if (isExpired) {
      expect(isRefetching).toBe(true);
      expect(data).toHaveProperty("access_token");
      if (data.access_token) {
        const token = getItem("tokens");
        expect(token).toHaveProperty("access_token", data.access_token);
      }
    } else expect(data).toBe("Token valid");
  });
});
