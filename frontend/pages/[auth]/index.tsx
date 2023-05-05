import { Form } from "../../components/auth/Form";
import React from "react";

const Auth = () => {
  return <Form />;
};

Auth.getLayout = (page: JSX.Element): JSX.Element => {
  return <div>{page}</div>;
};

export default Auth;
