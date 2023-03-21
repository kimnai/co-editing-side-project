import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { AsideStatusProvider } from "components/context/AsideStatusProvider";

type ComponentWithLayout = {
  getLayout: (page: JSX.Element) => JSX.Element;
} & NextPage;

interface AppPropsWithLayout extends AppProps {
  Component: ComponentWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      page;
    });

  return (
    <AsideStatusProvider>
      {getLayout(<Component {...pageProps} />)}
    </AsideStatusProvider>
  );
}
