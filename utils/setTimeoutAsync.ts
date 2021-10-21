export const setTimeoutAsync = async (callback: Function, delay: number) => {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return callback();
};
