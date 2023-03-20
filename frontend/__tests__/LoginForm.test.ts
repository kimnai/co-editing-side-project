import * as Funcs from "@hooks/useLogin";
test("email & password validation", () => {
  const { emailIsValid, pwdIsValid } = Funcs.handleSubmitLogin(
    "lydia0501@gmail.com",
    "Wub06106035"
  );

  expect({ emailIsValid, pwdIsValid }).toBe({
    emailIsValid: true,
    pwdIsValid: false,
  });
});
