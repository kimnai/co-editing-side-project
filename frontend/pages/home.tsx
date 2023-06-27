import { Form } from "@components/auth/Form";
import { LayoutAuth } from "@components/layout/LayoutAuth";
import { Nav } from "@components/layout/Nav";
import { PropsWithChildren } from "react";

const HomePage = () => {
  return <div>welcome back, user</div>;
};

HomePage.getLayout = (page) => {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export default HomePage;
