import { AppProps } from "next/app";
import React from "react";
import Header from "components/Header";
import InfoStack from "components/InfoStack";
import styles from "./MainContainer.module.scss";

const MainContainer: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContainer}>
        <Component {...pageProps} />
        <InfoStack />
      </main>
    </div>
  );
};

export default MainContainer;
