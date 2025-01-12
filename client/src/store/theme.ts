import { atom } from "recoil";

export const theme = atom({
  key: "theme",
  default: "dark",
});

export const menu = atom({
  key: "side-menu",
  default: "open",
});
