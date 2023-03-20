import { NextPage } from "next";
import { LayoutPublic } from "../../components/layout/LayoutPuplic";
import { LoginForm } from "../../components/login/LoginForm";

const Login = () => {
  return <LoginForm />;
};

Login.getLayout = (page: NextPage) => {
  return <LayoutPublic>{page}</LayoutPublic>;
};

export default Login;
