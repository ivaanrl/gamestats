import passport from "passport";
import steamStrategy from "passport-steam";
import twitchTvStrategy from "passport-twitchtv";
import { keys } from "../../config/keys";

const { STEAM_CLIENT_ID, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = keys();

passport.use(
  new twitchTvStrategy(
    {
      clientID: TWITCH_CLIENT_ID,
      clientSecret: TWITCH_CLIENT_SECRET,
      callbackURL: "/auth/twitchtv/callback",
      scope: "user_read",
    },
    (accessToken: any, refresToken: any, profile: any, done: any) => {
      console.log(accessToken);
      console.log(refresToken);
      console.log(profile);
      console.log(done);
      return [accessToken, refresToken, profile, done];
    }
  )
);

passport.use(
  new steamStrategy(
    {
      returnURL: "/auth/steam/return",
      realm: "http://localhost:3000/",
      apiKey: STEAM_CLIENT_ID,
      profile: true, // set to false to skip fetching data from the Steam Web API, removing need for API key
    },
    (identifier: any, profile: any, done: any) => {
      console.log(identifier);
      console.log(profile);
      console.log(done);
      return [identifier, profile, done];
    }
  )
);
