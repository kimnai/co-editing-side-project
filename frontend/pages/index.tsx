import React from "react";
import { LayoutAuth } from "@components/layout/LayoutAuth";

// const Aside = dynamic(
//   () => import("../components/layout/Aside").then((module) => module.Aside),
//   { loading: () => <div>loading</div> }
// );

const Home = () => {
  return <div>Welcome home</div>;
};

Home.getLayout = function (page) {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export default Home;
