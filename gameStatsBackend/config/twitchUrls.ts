import { keys } from "./keys";
const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = keys();

export const twitchURLS = {
  getAppId: `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
  getStreams: "https://api.twitch.tv/helix/streams",
  getGames: "https://api.twitch.tv/helix/games",
};
