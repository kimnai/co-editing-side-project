import { NextPage } from "next";
import { LayoutPublic } from "../../components/layout/LayoutPuplic";
import { LoginForm } from "../../components/login/LoginForm";

const Login = () => {
  return <LoginForm action="Log in" />;
};

Login.getLayout = (page: JSX.Element): JSX.Element => {
  return <LayoutPublic>{page}</LayoutPublic>;
};

export default Login;
