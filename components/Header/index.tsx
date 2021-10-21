import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  selectEmail,
  selectIsSignedIn,
  signOut,
  fetchLastUsedEmail,
} from "state/auth";
import styles from "./Header.module.scss";
import { useAppSelector } from "hooks/useAppSelector";
import { NavigationProp } from "./types";

const rawNavigationItems: NavigationProp[] = [
  { id: 0, title: "Products", route: "products" },
  { id: 1, title: "Posts", route: "posts" },
  { id: 2, title: "Auth", route: "auth" },
];

const Header: React.FC = () => {
  const [navigationItems, setNavigationItems] = useState(
    Array<NavigationProp>()
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const email = useAppSelector(selectEmail);
  const isSignedIn = useSelector(selectIsSignedIn);

  const onNavigationChanged = (item: NavigationProp) => {
    router.push(item.route);
  };

  useEffect(() => {
    rawNavigationItems.forEach((item) => {
      item.onClick = onNavigationChanged;
    });
    setNavigationItems(rawNavigationItems);
  }, []);

  const onSignOut = () => {
    dispatch(signOut());
    router.push("./auth");
  };

  useEffect(() => {
    dispatch(fetchLastUsedEmail());
  }, [email]);

  return (
    <header className={styles.header}>
      <b className={styles.email}>{isSignedIn ? email : ""}</b>
      <ul className={styles.navigationItems}>
        {navigationItems.map((item) => (
          <li key={item.id}>
            <button
              className={styles.submit}
              onClick={() => item.onClick(item)}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
