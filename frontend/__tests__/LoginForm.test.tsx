import {
  screen,
  render,
  renderHook,
  act,
  fireEvent,
} from "@testing-library/react";
import { useAuth } from "../hooks/auth/useAuth";
import { useUserAuthStore } from "store/useUserAuthStore";

//test case 1
test("Form validation", () => {
  const { result } = renderHook(() => useAuth());
  const { handleSubmitForm, dispatch, state } = result.current;

  act(() => {
    dispatch({ type: "SET_EMAIL", payload: "abc@gmail.com" });
    dispatch({ type: "SET_PASSWORD", payload: "lydiaWu" });

    dispatch({ type: "VALIDATE" });
  });

  const isValid = handleSubmitForm("login");
  expect(isValid).toBe(false);
});

//test case 2
test("Form validation", () => {
  const { result } = renderHook(() => useAuth());
  const { dispatch } = result.current;

  act(() => {
    dispatch({ type: "SET_EMAIL", payload: "abc@gmail.com" });
    dispatch({ type: "SET_PASSWORD", payload: "lydiaWu12345" });
    dispatch({ type: "SET_USER_NAME", payload: "lydia" });

    dispatch({ type: "VALIDATE" });
  });
  const { handleSubmitForm, state } = result.current;

  const isValid = handleSubmitForm("signup");
  expect(isValid).toBe(true);
});

test("if login or signup successfully, then tokens is set in localStorage", () => {
  // render(<LoginForm />);
  // fireEvent.click(screen.getByText("Login"));

  const { result } = renderHook(() => useAuth());
  const { dispatch } = result.current;
  const { result: store } = renderHook(() => useUserAuthStore());

  act(() => {
    dispatch({ type: "SET_EMAIL", payload: "abc@gmail.com" });
    dispatch({ type: "SET_PASSWORD", payload: "lydiaWu12345" });
    dispatch({ type: "SET_USER_NAME", payload: "lydia" });
    dispatch({ type: "VALIDATE" });
  });

  const { handleSubmitForm, state } = result.current;

  const isValid = handleSubmitForm("login");
  expect(store.current.loginInfo.isLoggedIn).toBe(true);

  const tokensInLocalStorage = JSON.parse(localStorage.getItem("tokens")!);
  expect(tokensInLocalStorage).toHaveProperty("access_token");
  expect(tokensInLocalStorage).toHaveProperty("refresh_token");
});

test("if login or signup successfully, global store is updated", () => {});
