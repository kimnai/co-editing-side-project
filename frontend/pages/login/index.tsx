import { NextPage } from "next";
import { LayoutPublic } from "../../components/layout/LayoutPuplic";
import { LoginForm } from "../../components/login/LoginForm";
import React, { PropsWithChildren } from "react";

const Login = () => {
  return <LoginForm />;
};

Login.getLayout = (page: JSX.Element): JSX.Element => {
  return <LayoutPublic>{page}</LayoutPublic>;
};

export default Login;
