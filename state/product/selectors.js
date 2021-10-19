export const selectProducts = (state) => state.products.products;
export const selectProductById = (id) => (state) => {
  return state.products.products.filter((product) => product.id === id)[0];
};
export const selectFetchStatus = (state) => state.products.status;
export const selectError = (state) => state.products.error;
