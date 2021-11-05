import type { NextPage } from "next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import cx from "classnames";
import SignIn from "components/Auth/SignIn";
import SignUp from "components/Auth/SignUp";
import styles from "./Auth.module.scss";
import { errorChanged } from "state/auth";

const AuthPage: NextPage = () => {
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);

  const onChangeView = () => {
    dispatch(errorChanged(""));
    setIsSignIn(!isSignIn);
  };

  return (
    <div className={styles.container}>
      <div className={styles.viewContainer}>
        <SignIn
          className={cx(styles.signInView, {
            [styles["is-signInViewSelected"]]: isSignIn,
          })}
        />
        <SignUp
          className={cx(styles.signUpView, {
            [styles["is-signInViewSelected"]]: isSignIn,
          })}
        />
      </div>
      <button
        className={cx(styles.toSignIn, {
          [styles["is-signInViewSelected"]]: isSignIn,
        })}
        onClick={onChangeView}
      >
        To Sign
      </button>
    </div>
  );
};

export default AuthPage;
