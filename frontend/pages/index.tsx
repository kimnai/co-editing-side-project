import React from "react";
import { LoginForm } from "@components/login/LoginForm";
import { useRouter } from "next/router";
import { LayoutAuth } from "@components/layout/LayoutAuth";

// const Aside = dynamic(
//   () => import("../components/layout/Aside").then((module) => module.Aside),
//   { loading: () => <div>loading</div> }
// );

const Home = () => {
  // const { isLoggedIn } = useUserAuthStore();
  // const router = useRouter();
  // if (!isLoggedIn) router.push("/user/login");
  return <>Welcome home</>;
};

Home.getLayout = function (page) {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export default Home;
