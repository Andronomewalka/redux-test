import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { signOut, selectIsSignedIn } from "state/auth";
import { infoAdded, InfoStatus } from "state/info";
import styles from "./Chatik.module.scss";

const ChatikPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isSignedIn = useAppSelector(selectIsSignedIn);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(infoAdded({ text: "Sign In please", status: InfoStatus.Bad }));
      dispatch(signOut());
      router.push("./auth");
    }
  }, []);

  return (
    <div className={styles.container}>{isSignedIn && <div>Ti pidor</div>}</div>
  );
};

export default ChatikPage;
