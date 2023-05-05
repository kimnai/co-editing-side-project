import { Form } from "@components/auth/Form";
import React from "react";

const Home: React.FC = () => {
  return (
    <div>
      <Form />
    </div>
  );
};

Home.getLayout = (page: JSX.Element): JSX.Element => {
  return <div>{page}</div>;
};

export default Home;
