import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { AsideStatusProvider } from "../components/context/AsideStatusProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useNprogress } from "@hooks/useNprogress";
import "@style/nprogress.css";

type ComponentWithLayout = {
  getLayout: (page: JSX.Element) => JSX.Element;
} & NextPage;

interface AppPropsWithLayout extends AppProps {
  Component: ComponentWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useNprogress();
  const getLayout =
    Component.getLayout ||
    ((page) => {
      page;
    });

  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <AsideStatusProvider>
          {getLayout(<Component {...pageProps} />)}
        </AsideStatusProvider>
      </GoogleOAuthProvider>
    </div>
  );
}
