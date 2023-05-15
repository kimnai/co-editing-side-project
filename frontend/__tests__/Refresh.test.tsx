import { Nav } from "@components/layout/Nav";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { renderHook, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import mockRouter from "next-router-mock";
import { KEY_FOR_LS } from "@lib/enum/auth";
import {
  handleTokenApiReq,
  handleTokenRotation,
  useRotateToken,
} from "@hooks/useRotateToken";
import { refreshTokenErrorResponse } from "@lib/constant/auth";
import { decode, sign } from "jsonwebtoken";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { axiosInstance } from "api";

const queryClient = new QueryClient();

const wrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

jest.mock("next/router", () => require("next-router-mock"));

describe("Token api request and storage functions correctly", () => {
  it("if token is not expired, then refresh request won't be made", async () => {
    const access_token = sign(
      { username: "lydia", email: "test@gmail.com" },
      "my-secret",
      { expiresIn: "1h" }
    );

    localStorage.setItem(KEY_FOR_LS.access_token, access_token);
    const response = await handleTokenApiReq();
    expect(response).toBe("Token valid");
  });

  it("if token expires, request will be made", async () => {
    const access_token = sign(
      { username: "lydia", email: "test@gmail.com", rotated: false },
      "my-secret",
      { expiresIn: "0s" }
    );
    localStorage.setItem(KEY_FOR_LS.access_token, access_token);

    const response = await handleTokenApiReq();

    const decoded = decode(response.access_token);
    expect(decoded).toHaveProperty("rotated", true);
  });

  it("If userInfo in localStorage doesn't match info decoded from token, it will throw error", async () => {
    const access_token = sign(
      { username: "lydia", email: "test@gmail.com", rotated: false },
      "my-secret",
      { expiresIn: "0s" }
    );
    localStorage.setItem(KEY_FOR_LS.access_token, access_token);

    localStorage.setItem(
      KEY_FOR_LS.user_info,
      JSON.stringify({ username: "lydiaaa", email: "test@gmail.com" })
    );
    try {
      const res = await handleTokenRotation();
    } catch (error) {
      expect(error).toBe("User info does not match");
    }
  });

  it("If token mutation fails, then user will be logout", async () => {
    const access_token = sign(
      { username: "lydia", email: "test@gmail.com", rotated: false },
      "my-secret",
      { expiresIn: "0s" }
    );
    localStorage.setItem(KEY_FOR_LS.access_token, access_token);
    localStorage.setItem(
      KEY_FOR_LS.user_info,
      JSON.stringify({ username: "lydiaaa", email: "test@gmail.com" })
    );

    const { result } = renderHook(useRotateToken, { wrapper });
    const { mutateToken } = result.current;

    try {
      await mutateToken();
    } catch (error) {
      console.error(error);
      const access_token_in_LS = localStorage.getItem(KEY_FOR_LS.access_token);
      const userInfo_in_LS = localStorage.getItem(KEY_FOR_LS.user_info);
      expect(access_token_in_LS).toBe(null);
      expect(userInfo_in_LS).toBe(null);
    }
  });
});

describe("axios interceptor functions correctly", () => {
  it("If request fails with 403 code, then token will be refreshed", async () => {
    const userInfo = { username: "lydia", email: "test@gmail.com" };
    const access_token = sign(userInfo, "my-secret", { expiresIn: "0s" });
    localStorage.setItem(
      KEY_FOR_LS.access_token,
      JSON.stringify({ access_token: access_token })
    );
    localStorage.setItem(KEY_FOR_LS.user_info, JSON.stringify(userInfo));

    try {
      const res = await axiosInstance.get("/resource");
    } catch (error) {
      console.log(error);
    }
    const new_access_token = localStorage.getItem(KEY_FOR_LS.access_token);
    expect(new_access_token).not.toBe(null);
    const decoded = decode(new_access_token);
    expect(decoded).toHaveProperty("triggeredByInterceptor", true);
  });
});

// describe("Token rotation functions correctly", () => {
//   it("If LS contains access_token and userInfo, then it will hit /refresh when user click login button", async () => {
//     render(<Nav />);
//     const loginBtn = screen.getByTestId("login-btn");

//     //set userInfo & access_token in localStorage
//     useLocalStorageHook.current.setItem(
//       KEY_FOR_LS.access_token,
//       "access_token"
//     );
//     useLocalStorageHook.current.setItem(KEY_FOR_LS.user_info, {
//       email: "123@gmail.com",
//       username: "123",
//       loginProvider: "First_party",
//     });

//     //button clicked
//     await userEvent.click(loginBtn);

//     const access_token = useLocalStorageHook.current.getItem(
//       KEY_FOR_LS.access_token
//     );

//     expect(access_token).toBe("updated_access_token");
//   });

//   // it("If request failed with 403 error, then it will refresh token automatically", async () => {
//   //   await act(async () => {
//   //     const res = await axiosInstance.post("http://localhost/backend/resource");
//   //   });

//   //   const { result } = renderHook(useRotateToken);

//   //   expect(result.current.isFetching).toBe(true);
//   // });
// });
