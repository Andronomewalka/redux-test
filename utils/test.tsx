import React, { FC, ReactElement } from "react";
import { Provider } from "react-redux";
import { render, RenderOptions } from "@testing-library/react";
import state from "state/store";

const AllTheProviders: FC = ({ children }) => {
  return <Provider store={state}>{children}</Provider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
