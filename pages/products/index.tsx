import type { NextPage } from "next";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Products from "components/Products";
import { selectEmail, signOut } from "state/auth";
import styles from "./products.module.scss";

const ProductsPage: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const email = useSelector(selectEmail);

  const onSignOut = () => {
    dispatch(signOut());
    router.push("./auth");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <b className={styles.email}>{email}</b>
        <button className={styles.submit} onClick={onSignOut}>
          Sign out
        </button>
      </header>
      <Products />
    </div>
  );
};

export default ProductsPage;
