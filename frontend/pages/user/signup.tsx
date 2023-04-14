import { LayoutPublic } from "../../components/layout/LayoutPuplic";
import { LoginForm } from "../../components/login/LoginForm";
import React from "react";

const Signup = () => {
  return <LoginForm action="signup" />;
};

Signup.getLayout = (page: JSX.Element): JSX.Element => {
  return <LayoutPublic>{page}</LayoutPublic>;
};

export default Signup;
