import Link from "next/link";
import { useUserAuthStore } from "store/useUserAuthStore";
import classes from "@style/Layout.module.css";
import { useAuth } from "@hooks/auth/useAuth";
import { useGoogleAuth } from "@hooks/auth/useGoogleAuth";
import { useRouter } from "next/router";

export const Nav = (): JSX.Element => {
  const { loginInfo } = useUserAuthStore();
  console.log(loginInfo);
  const { isLoggedIn, isGoogleLogin } = loginInfo;
  const { handleLogout } = useAuth();
  const { handleGoogleLogout } = useGoogleAuth();
  const router = useRouter();

  const onLogout = () => {
    if (isGoogleLogin) handleGoogleLogout();
    else handleLogout();
  };

  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn ? (
          <li>
            <Link href={"/user/login"} onClick={onLogout}>
              Logout
            </Link>
          </li>
        ) : (
          <>
            {router.pathname.includes("login") ? (
              <li>
                <Link href={"/user/signup"}>Signup</Link>
              </li>
            ) : (
              <li>
                <Link href={"/user/login"}>Login</Link>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};
