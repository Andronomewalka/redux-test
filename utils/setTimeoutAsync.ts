export const setTimeoutAsync = async (callback, delay) => {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return callback();
};
