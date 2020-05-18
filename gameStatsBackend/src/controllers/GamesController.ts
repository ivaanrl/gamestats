import { controller, get } from "./decorators";
import e, { Request, Response } from "express";
import request from "request-promise";
import { keys } from "../../config/keys";
import { steamURLS } from "../../config/steamUrls";
import { getGameCurrentPlayers, getGameDetails } from "../services/steamAPI";
import {
  getTwitchAppId,
  getTwitchGamesIdByName,
  getCurrentViewers,
} from "../services/twitchAPI";

const { STEAM_CLIENT_ID, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = keys();

@controller("/api/games")
class GamesController {
  @get("/search/:gameName")
  async getSearchedGame(req: Request, res: Response) {
    //get twitchAppId to be able to make requests.
    let twitchAppId: string = "";
    await getTwitchAppId().then((res) => {
      twitchAppId = res;
    });

    const searchedGame = req.params.gameName.replace("+", " ").toLowerCase();
    let gameList: { appid: number; name: string }[] = [];

    await request(
      steamURLS.getGamesAppIDsAndNames,
      { json: true },
      (err, _res, body) => {
        if (err) {
          console.log(err);
        } else {
          gameList = body.applist.apps;
        }
      }
    );

    const searchedGames = await getGameCurrentPlayers(gameList, searchedGame);

    const searchedGamesWithTwitchInfo = await getTwitchGamesIdByName(
      searchedGames,
      twitchAppId
    );

    const searchedGamesWithTwitchViewCount = await getCurrentViewers(
      searchedGamesWithTwitchInfo,
      twitchAppId
    );

    const finalSearchResult = await getGameDetails(
      searchedGamesWithTwitchViewCount
    );

    //FINAL RESULT SORT by current players on steam

    finalSearchResult.sort((a, b) => {
      return b.currentPlayers - a.currentPlayers;
    });
    res.json(finalSearchResult);
  }
}
