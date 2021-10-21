const safeLocalStorage = {
  getItem(item: any) {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem(item);
    }
  },

  setItem(key: string, value: any) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, value);
    }
  },
};

export default safeLocalStorage;
