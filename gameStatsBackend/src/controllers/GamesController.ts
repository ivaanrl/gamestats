import { controller, get } from "./decorators";
import e, { Request, Response } from "express";
import request from "request-promise";
import { steamURLS } from "../../config/steamUrls";
import {
  getSearchedGamesCurrentPlayers,
  getGameDetails,
  getListOfAllGames,
  getGamesCurrentPlayers,
} from "../services/steamAPI";
import {
  getTwitchAppId,
  getTwitchGamesIdByName,
  getCurrentViewers,
  getTopStreams,
  getGameById,
  topStreamsWithNameInterface,
} from "../services/twitchAPI";

@controller("/api/games")
class GamesController {
  @get("/search/:gameName")
  async getSearchedGame(req: Request, res: Response) {
    let twitchAppId: string = "";
    await getTwitchAppId().then((res) => {
      twitchAppId = res;
    });

    const searchedGame = req.params.gameName.replace("+", " ").toLowerCase();

    const gameList = await getListOfAllGames();

    const searchedGames = await getSearchedGamesCurrentPlayers(
      gameList,
      searchedGame
    );

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

  @get("/topGames")
  async getTopGames(req: Request, res: Response) {
    let twitchAppId: string = "";
    await getTwitchAppId().then((res) => {
      twitchAppId = res;
    });

    const topStreams = await getTopStreams(twitchAppId);

    const topStreamsWithName: topStreamsWithNameInterface = await getGameById(
      topStreams,
      twitchAppId
    );

    const topStreamsWithCurrentPlayers = await getGamesCurrentPlayers(
      topStreamsWithName
    );
  }
}
