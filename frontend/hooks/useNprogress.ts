import { useEffect } from "react";
import Nprogress from "nprogress";
import { useRouter } from "next/router";

export const useNprogress = () => {
  Nprogress.configure({ showSpinner: false });
  const router = useRouter();

  const handleRouteChange = () => {
    Nprogress.start();
  };

  const handleRouteChangeStop = () => {
    Nprogress.done();
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChangeStop);
    router.events.on("routeChangeError", handleRouteChangeStop);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChangeStop);
      router.events.off("routeChangeError", handleRouteChangeStop);
    };
  }, []);

  useEffect(() => {
    console.log(Nprogress.status);
  }, [Nprogress.status]);

  return {};
};
