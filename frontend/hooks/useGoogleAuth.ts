import { useGoogleLogin, googleLogout } from "@react-oauth/google";

interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export const useGoogleAuth = () => {
  const handleSetUserData = (res: GoogleTokenResponse) => {
    console.log(res);
    const { expires_in, access_token, token_type } = res;
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (res) => handleSetUserData(res),
    onError: (res) => {
      console.log(res);
    },
  });

  const handleGoogleLogout = () => {
    googleLogout();
  };

  return { handleGoogleLogin, handleGoogleLogout };
};
