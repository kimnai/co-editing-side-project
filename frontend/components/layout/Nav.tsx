import { AuthType } from "@lib/type/auth";
import Link from "next/link";
import classes from "@style/Auth.module.css";
import { useRotateToken } from "@hooks/useRotateToken";
import { useRouter } from "next/router";

export const Nav = (): JSX.Element => {
  const router = useRouter();
  const { mutateToken } = useRotateToken();
  const items: AuthType[] | string[] = ["login", "signup"];

  return (
    <nav className={classes.nav}>
      <ul>
        {items.map((i) => (
          <li
            key={i}
            data-testid={`${i}-btn`}
            onClick={async () => {
              await mutateToken();
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
