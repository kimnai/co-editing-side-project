import { LayoutAuth } from "@components/layout/LayoutAuth";
import { PropsWithChildren } from "react";

const UserHomePage = () => {
  return <div>home</div>;
};

UserHomePage.getLayout = (props: PropsWithChildren) => {
  return <LayoutAuth>{props.children}</LayoutAuth>;
};

export default UserHomePage;
