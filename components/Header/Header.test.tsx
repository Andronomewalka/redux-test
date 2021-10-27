import React from "react";
import renderer from "react-test-renderer";
import Header from "./index";
import styles from "./Header.module.scss";
import { Provider } from "react-redux";
import state from "state/store";

test("Header has 2 children", () => {
  const component = renderer.create(
    <Provider store={state}>
      <Header />
    </Provider>
  );

  const root = component.root;

  expect(root.findByProps({ className: styles.header }).children.length).toBe(
    2
  );
});
