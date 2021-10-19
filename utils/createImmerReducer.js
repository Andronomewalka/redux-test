import produce from "immer";

export const createImmerReducer = (state, action) => {
  const draft = state;
  return produce((draft, action) => {});
};
