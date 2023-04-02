import React, { useState } from "react";
import dynamic from "next/dynamic";



const Aside = dynamic(
  () => import("../components/layout/Aside").then((module) => module.Aside),
  { loading: () => <div>loading</div> }
);

const Home= () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      Welcome to home
      <button onClick={() => setIsVisible((prev) => !prev)}>show aside</button>
      {isVisible ? <Aside /> : <></>}
    </div>
  );
};

Home.getLayout = function (page){
  return <div>{page}</div>
}

export default Home;
