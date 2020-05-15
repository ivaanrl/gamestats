import { devKeys } from "./dev";
import { prodKeys } from "./prod";

export const keys = (): {
  STEAM_CLIENT_ID: string;
  TWITCH_CLIENT_SECRET: string;
  TWITCH_CLIENT_ID: string;
} => {
  if (process.env.NODE_ENV === "production") {
    return prodKeys;
  } else {
    return devKeys;
  }
};
