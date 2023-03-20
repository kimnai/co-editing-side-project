import { LayoutPublic } from "components/layout/LayoutPuplic";
import { LoginForm } from "components/login/LoginForm";

const SignUp = () => {
  return <LoginForm action="Sign up" />;
};

SignUp.getLayout = (props) => {
  return <LayoutPublic>{props.children}</LayoutPublic>;
};

export default SignUp;
