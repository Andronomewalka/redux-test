import React from "react";
import { Provider } from "react-redux";
import state from "state/store";
import { fetchProductsBySearch } from "state/product";
import { useAppDispatch } from "hooks/useAppDispatch";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const DispatchWrapper = ({ children }) => {
  const dispatch = useAppDispatch();
  dispatch(
    fetchProductsBySearch({
      search: "",
      page: 1,
    })
  );

  return children;
};

export const decorators = [
  (Story) => (
    <Provider store={state}>
      <DispatchWrapper>
        <Story />
      </DispatchWrapper>
    </Provider>
  ),
];
