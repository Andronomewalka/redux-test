export const validationErrorChangedInternal = (state, action) => {
  state.validationError = action.payload;
};

export const signOutInternal = (state, action) => {
  state.isSignedIn = false;
  state.email = "";
};
