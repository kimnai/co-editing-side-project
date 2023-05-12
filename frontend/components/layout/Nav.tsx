import { AuthType } from "@lib/type/auth";
import Link from "next/link";
import classes from "@style/Auth.module.css";

export const Nav = (): JSX.Element => {
  const items: AuthType[] | string[] = ["login", "signup"];
  return (
    <nav className={classes.nav}>
      <ul>
        {items.map((i) => (
          <li key={i}>
            <Link href={`/auth/${i}`}>
              {i.slice(0, 1).toUpperCase() + i.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
