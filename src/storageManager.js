export const storageManager = {
  prefix: "sh-",
  setItem(title, data) {
    window.localStorage.setItem(`${this.prefix}${title}`, JSON.stringify(data));
  },
  getItem(title) {
    return JSON.parse(window.localStorage.getItem(`${this.prefix}${title}`));
  },
};
