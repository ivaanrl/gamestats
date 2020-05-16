import passport from "passport";
import steamStrategy from "passport-steam";
import twitchTvStrategy from "passport-twitchtv";
import { keys } from "../../config/keys";
import { User } from "../models/User";

const { STEAM_CLIENT_ID, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = keys();

passport.serializeUser((user: string, cb) => {
  cb(null, user);
});

passport.deserializeUser(async (id: string, cb) => {
  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    console.log("deserialize");

    cb(null, user);
  } catch (e) {
    console.log(e);
    cb(null, null);
  }
});

/*passport.use(
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
);*/

passport.use(
  new steamStrategy(
    {
      returnURL: "http://localhost:5000/api/auth/steam/callback",
      realm: "http://localhost:5000/",
      apiKey: STEAM_CLIENT_ID,
      profile: true,
    },
    async (_identifier: string, profile: any, done: Function) => {
      try {
        let user = await User.findOne({
          where: {
            id: profile._json.steamid,
          },
        });

        if (!user) {
          user = await User.create({
            id: profile._json.steamid,
            username: profile._json.personaname,
          });
        }

        done(null, profile._json.steamid);
      } catch (error) {
        console.log("Error querying user from db: ", error);
        done(null, error);
      }
    }
  )
);
