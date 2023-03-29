import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { AsideStatusProvider } from "components/context/AsideStatusProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AsideStatusProvider>
          {getLayout(<Component {...pageProps} />)}
        </AsideStatusProvider>
      </QueryClientProvider>
    </>
  );
}
