import { Error, useAuth } from "../hooks/useAuth";
import { Nav } from "@components/layout/Nav";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { renderHook, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import mockRouter from "next-router-mock";
import { KEY_FOR_LS } from "@lib/enum/auth";
import { LoginReqBody } from "@lib/type/auth";
import { loginErrorResponse } from "@lib/constant/auth";
import { UserInfo } from "@lib/interface/auth";
import { useRotateToken } from "../hooks/useRotateToken";
import { axiosInstance } from "api";

jest.mock("next/router", () => require("next-router-mock"));

const { result: useLocalStorageHook } = renderHook(useLocalStorage);

// test("Error state is correctly updated if login api calls fail", async () => {
//   const { result } = renderHook(() => useAuth("login"));

//   const { handleLoginReq } = result.current;

//   const body: LoginReqBody<"FirstParty"> = {
//     email: "lydia@test",
//     password: "1234567",
//     source: "FirstParty",
//   };

//   await act(async () => await handleLoginReq(body));

//   const { errorState } = result.current;
//   console.log(errorState);

//   const error: Error = errorState.filter((e) => e.field === "global")[0];

//   expect(error).toStrictEqual({
//     field: "global",
//     message: loginErrorResponse[400],
//   });
// });

// test("If logs out, then access_token and userInfo in LS will be cleared");

describe("Token rotation functions correctly", () => {
  it("If LS contains access_token and userInfo, then it will hit /refresh when user click login button", async () => {
    render(<Nav />);
    const loginBtn = screen.getByTestId("login-btn");

    useLocalStorageHook.current.setItem(
      KEY_FOR_LS.access_token,
      "access_token"
    );
    useLocalStorageHook.current.setItem(KEY_FOR_LS.user_info, {
      email: "123@gmail.com",
      username: "123",
      loginProvider: "First_party",
    });

    await userEvent.click(loginBtn);

    const access_token = useLocalStorageHook.current.getItem(
      KEY_FOR_LS.access_token
    );

    expect(access_token).toBe("updated_access_token");
  });

  // it("If request failed with 403 error, then it will refresh token automatically", async () => {
  //   await act(async () => {
  //     const res = await axiosInstance.post("http://localhost/backend/resource");
  //   });

  //   const { result } = renderHook(useRotateToken);

  //   expect(result.current.isFetching).toBe(true);
  // });
});
