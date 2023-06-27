import { LayoutPublic } from "@components/layout/LayoutPuplic";
import { Form } from "../../components/auth/Form";
import React from "react";

const Auth = () => {
  return <Form />;
};

Auth.getLayout = (page: JSX.Element): JSX.Element => {
  return <LayoutPublic>{page}</LayoutPublic>;
};

export default Auth;
