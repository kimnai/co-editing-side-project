import { useRotateToken } from "@hooks/useRotateToken";
import { AuthType } from "@lib/type/auth";
import classes from "@style/Auth.module.css";
import { useRouter } from "next/router";

export const Nav = (): JSX.Element => {
  const router = useRouter();
  const { mutateToken } = useRotateToken();
  const items: AuthType[] | string[] = ["login", "signup"];

  const handleSilentLogin = async () => {
    try {
      const res = await mutateToken();
      if (!res) throw new Error();
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className={classes.nav}>
      <ul>
        {items.map((i) => (
          <li
            key={i}
            data-testid={`${i}-btn`}
            onClick={async () => {
              await handleSilentLogin();
              router.push(`/auth/${i}`);
            }}
          >
            {i.slice(0, 1).toUpperCase() + i.slice(1)}
          </li>
        ))}
      </ul>
    </nav>
  );
};
