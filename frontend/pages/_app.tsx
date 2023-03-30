import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { AsideStatusProvider } from "@components/context/AsideStatusProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

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

  console.log(process.env.GOOGLE_CLIENT_ID);

  return (
    <>
      <GoogleOAuthProvider clientId="456571813861-77cc4avdv2a5gf0hib3vulsd0joauhuq.apps.googleusercontent.com">
        <QueryClientProvider client={queryClient}>
          <AsideStatusProvider>
            {getLayout(<Component {...pageProps} />)}
          </AsideStatusProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </>
  );
}
