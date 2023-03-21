import { LayoutPublic } from "components/layout/LayoutPuplic";
import { LoginForm } from "components/login/LoginForm";
import { NextPage } from "next";
import { PropsWithChildren } from "react";

const SignUp = () => {
  return <LoginForm action="Sign up" />;
};

SignUp.getLayout = (page: JSX.Element) => {
  return <LayoutPublic>{page}</LayoutPublic>;
};

export default SignUp;
