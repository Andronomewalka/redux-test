import { Provider } from "react-redux";
import state from "../state/store.js";
import Middleware from "../utils/_middleware.js";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={state}>
      <Middleware>
        <Component {...pageProps} />
      </Middleware>
    </Provider>
  );
}

export default MyApp;
