import * as Funcs from "@hooks/useLogin";
test("email & password validation", () => {
  const { emailIsValid, pwdIsValid } = Funcs.handleSubmitLogin(
    "lydia0501@gmail.com",
    "Wub0610"
  );

  expect(emailIsValid).toBe(true);
  expect(pwdIsValid).toBe(false);
});
