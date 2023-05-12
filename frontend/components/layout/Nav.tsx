import { AuthType } from "@lib/type/auth";
import classes from "@style/Auth.module.css";
import { useRouter } from "next/router";

export const Nav = (): JSX.Element => {
  const router = useRouter();
  const items: AuthType[] | string[] = ["login", "signup"];

  return (
    <nav className={classes.nav}>
      <ul>
        {items.map((i) => (
          <li
            key={i}
            data-testid={`${i}-btn`}
            onClick={async () => {
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
