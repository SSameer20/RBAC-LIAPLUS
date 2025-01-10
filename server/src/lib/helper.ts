import { Log } from "./types";

export const log: Log = {
  info: (mesage) => {
    console.log(`[INFO] : ${mesage.toString()}`);
  },
  error: (mesage) => {
    console.log(`[ERROR] : ${mesage.toString()}`);
  },
};

export enum STATUS_CODE {
  OK = 200,
  CREATED = 201,
  NOT_AUTHORISED = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 504,
}
