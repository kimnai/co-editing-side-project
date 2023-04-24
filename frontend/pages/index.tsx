import React from "react";
import { LoginForm } from "@components/login/LoginForm";
import { useRouter } from "next/router";
import { LayoutAuth, NoSsrWrapper } from "@components/layout/LayoutAuth";
import { useUserAuthStore } from "store/useUserAuthStore";
import dynamic from "next/dynamic";

// const Aside = dynamic(
//   () => import("../components/layout/Aside").then((module) => module.Aside),
//   { loading: () => <div>loading</div> }
// );

const NoSsrLayoutAuth = dynamic(
  () =>
    import("@components/layout/LayoutAuth").then((module) => module.LayoutAuth),
  { ssr: false, loading: () => <></> }
);

const Home = () => {
  return <>Welcome home</>;
};

Home.getLayout = function (page) {
  return <>{<NoSsrLayoutAuth>{page}</NoSsrLayoutAuth>}</>;
};

export default Home;
