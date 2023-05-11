import { LayoutPublic } from "@components/layout/LayoutPuplic";

const Home = () => {
  return (
    <>
      <div>Welcome</div>
    </>
  );
};

Home.getLayout = (page) => {
  return <LayoutPublic>{page}</LayoutPublic>;
};

export default Home;
