import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import state from "state/store";
import MainContainer from "components/MainContainer";
import "../styles/globals.scss";

function MyApp(props: AppProps) {
  return (
    <Provider store={state}>
      <MainContainer {...props} />
    </Provider>
  );
}

export default MyApp;
