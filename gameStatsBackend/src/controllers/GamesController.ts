import { controller, get } from "./decorators";
import { Request, Response } from "express";
import request from "request-promise";

@controller("/api/games")
class GamesController {
  @get("/search/:gameName")
  async getSearchedGame(req: Request, res: Response) {
    const searchedGame = req.params.gameName.replace("+", " ").toLowerCase();
    let gameList: { appid: number; name: string }[] = [];

    await request(
      "https://api.steampowered.com/ISteamApps/GetAppList/v2",
      { json: true },
      (err, _res, body) => {
        if (err) {
          console.log(err);
        } else {
          gameList = body.applist.apps;
        }
      }
    );

    const searchResult: number[] = [];

    gameList.forEach((game) => {
      if (game.name.toLowerCase().includes(searchedGame)) {
        searchResult.push(game.appid);
      }
    });

    res.json(searchResult);
  }
}
