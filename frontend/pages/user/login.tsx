import { LayoutPublic } from "../../components/layout/LayoutPuplic";
import { LoginForm } from "../../components/login/LoginForm";
import React from "react";

const Login = () => {
  return <LoginForm action="login" />;
};

Login.getLayout = (page: JSX.Element): JSX.Element => {
  return <LayoutPublic>{page}</LayoutPublic>;
};

export default Login;
