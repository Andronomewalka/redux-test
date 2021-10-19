const safeLocalStorage = {
  getItem(item) {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem(item);
    }
  },

  setItem(key, value) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, value);
    }
  },
};

export default safeLocalStorage;
