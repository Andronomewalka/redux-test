import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import state from "state/store";
import Middleware from "utils/_middleware";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={state}>
      <Middleware>
        <Component {...pageProps} />
      </Middleware>
    </Provider>
  );
}

export default MyApp;
