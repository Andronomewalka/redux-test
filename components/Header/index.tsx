import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { selectEmail, selectIsSignedIn, signOut } from "state/auth";
import styles from "./Header.module.scss";
import { useAppSelector } from "hooks/useAppSelector";
import { NavigationProp } from "./types";
import { ClassNameProp } from "utils/basePropTypes";
import { useAppDispatch } from "hooks/useAppDispatch";

const rawNavigationItems: NavigationProp[] = [
  { id: 0, title: "Products", route: "products" },
  { id: 1, title: "Posts", route: "posts" },
  { id: 2, title: "Chatik", route: "chatik" },
  { id: 3, title: "Auth", route: "auth" },
];

const Header: React.FC<ClassNameProp> = ({ className }) => {
  const [navigationItems, setNavigationItems] = useState(
    Array<NavigationProp>()
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const email = useAppSelector(selectEmail);
  const isSignedIn = useSelector(selectIsSignedIn);

  const onSignOut = () => {
    dispatch(signOut());
    router.push("./auth");
  };

  const onNavigationChanged = (item: NavigationProp) => {
    if (item.route === "auth") {
      onSignOut();
    } else {
      router.push(item.route);
    }
  };

  useEffect(() => {
    rawNavigationItems.forEach((item) => {
      item.onClick = onNavigationChanged;
    });
    setNavigationItems(rawNavigationItems);
  }, []);

  useEffect(() => {
    const authItem = navigationItems.find((item) => item.route === "auth");
    if (authItem) {
      authItem.title = isSignedIn ? "Sign Out" : "Auth";
      setNavigationItems([...navigationItems]);
    }
  }, [isSignedIn]);

  return (
    <header data-testid="header" className={styles.header}>
      <b className={styles.email}>{isSignedIn ? email : ""}</b>
      <ul className={styles.navigationItems}>
        {navigationItems.map((item) => (
          <li key={item.id}>
            <button
              className={styles.inverse}
              onClick={() => item.onClick!(item)}
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
