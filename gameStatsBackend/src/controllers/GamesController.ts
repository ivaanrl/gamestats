import { controller, get } from "./decorators";
import e, { Request, Response } from "express";
import request from "request-promise";
import { keys } from "../../config/keys";
import { steamURLS } from "../../config/steamUrls";
import { twitchURLS } from "../../config/twitchUrls";

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

    //FINAL RESULT SORT

    finalSearchResult.sort((a, b) => {
      return b.currentPlayers - a.currentPlayers;
    });

    //console.log(searchedGames);
    res.json(finalSearchResult);
  }
}

const getGameCurrentPlayers = async (
  gameList: { appid: number; name: string }[],
  searchedGame: string
) => {
  const searchResult: {
    appid: number;
    name: string;
    currentPlayers: number;
  }[] = [];

  await Promise.all(
    gameList.map(async (game) => {
      if (game.name.toLowerCase().includes(searchedGame)) {
        await request(
          steamURLS.getGameCurrentPlayers + game.appid,
          { json: true },
          (err, _res, body) => {
            if (err) {
              console.log(err);
            } else {
              searchResult.push({
                ...game,
                currentPlayers: body.response.player_count,
              });
            }
          }
        );
      }
    })
  );
  return searchResult;
};

export interface gameDetails {
  appid: {
    success: boolean;
    data: {
      type: string;
      name: string;
      steam_appid: number;
      required_age: number;
      is_free: boolean;
      controller_support?: string;
      dlc?: number[];
      detailed_description: string;
      about_the_game: string;
      short_description: string;
      fullgame?: string;
      supported_languages: string;
      reviews: string;
      header_image: string;
      website: string;
      pc_requirements: {
        minimum: string;
        recommended: string;
      };
      mac_requirements: {
        minimum: string;
        recommended: string;
      };
      linux_requirements: {
        minimum: string;
        recommended: string;
      };
      legal_notice?: string;
      developers?: string[];
      publishers: string[];
      demos?: {
        appid: number;
        description: string;
      };
      price_overview?: {
        currency: string;
        initial: number;
        final: number;
        discount_percent: number;
        initial_formatted: string;
        final_formatted: string;
      };
      package_groups: {
        name: string;
        title: string;
        description: string;
        selection_text: string;
        display_type: number;
        is_recurring_subscription: string;
        subs: {
          packageid: number;
          percent_savings_text: string;
          percent_savings: number;
          option_text: string;
          option_description: string;
          can_get_free_license: false;
          price_in_cents_with_discount: number;
        }[];
      }[];
      platforms: {
        windows: boolean;
        max: boolean;
        linux: boolean;
      };
      metacritic?: {
        score: number;
        url: string;
      };
      categories?: {
        id: number;
        description: string;
      }[];
      genres?: {
        id: string;
        description: string;
      }[];
      screenshots?: {
        id: number;
        path_thumbnail: string;
        path_full: string;
      }[];
      movies?: {
        id: number;
        name: string;
        thumbnail: string;
        webm: {
          480: string;
          max: string;
        };
        highlight: boolean;
      }[];
      recommendations?: {
        total: number;
      };
      achievements?: {
        total: number;
        highlighted: {
          name: string;
          path: string;
        }[];
      };
      release_data: {
        coming_soon: boolean;
        date: string;
      };
      support_info: {
        url: string;
        email: string;
      };
      background: string;
      content_descriptors: {
        id: string[];
        notes: null;
      };
    };
  };
}

const getGameDetails = async (
  searchedGames: {
    appid: number;
    name: string;
    currentPlayers: number;
    twitchId: string | null;
    twitchName: string | null;
    twitch_box_art_url: string | null;
    view_count: number;
  }[]
) => {
  const finalSearchResult: {
    appid: number;
    name: string;
    currentPlayers: number;
    twitchId: string | null;
    twitchName: string | null;
    twitch_box_art_url: string | null;
    view_count: number;
    appdetails: gameDetails;
  }[] = [];
  try {
    await Promise.all(
      searchedGames.map(async (game) => {
        await request(
          steamURLS.getGameDetails + game.appid,
          { json: true },
          (err, _res, body) => {
            if (err) {
              console.log(err);
            } else {
              finalSearchResult.push({ ...game, appdetails: body });
            }
          }
        );
      })
    );
  } catch (error) {
    //console.log(error.message);
  }
  return finalSearchResult;
};

const getTwitchAppId = async () => {
  const options = {
    method: "POST",
    uri: twitchURLS.getAppId,
    json: true,
  };
  try {
    const response: {
      access_token: string;
      expires_in: number;
      token_type: string;
    } = await request(options);

    return response.access_token;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const getTwitchGamesIdByName = async (
  gameList: {
    appid: number;
    name: string;
    currentPlayers: number;
  }[],
  twitchAppId: string
) => {
  const gameListWithTwitchInfo: {
    appid: number;
    name: string;
    currentPlayers: number;
    twitchId: string | null;
    twitchName: string | null;
    twitch_box_art_url: string | null;
  }[] = [];

  await Promise.all(
    gameList.map(async (game) => {
      const options = {
        method: "GET",
        uri: twitchURLS.getGames + `?name=${game.name}`,
        headers: {
          Authorization: `Bearer ${twitchAppId}`,
          "Client-ID": TWITCH_CLIENT_ID,
        },
        json: true,
      };

      try {
        const response: {
          data: {
            id: string;
            name: string;
            box_art_url: string;
          }[];
        } = await request(options);

        if (response.data[0] === undefined) {
          gameListWithTwitchInfo.push({
            ...game,
            twitchId: null,
            twitchName: null,
            twitch_box_art_url: null,
          });
        } else {
          gameListWithTwitchInfo.push({
            ...game,
            twitchId: response.data[0].id,
            twitchName: response.data[0].name,
            twitch_box_art_url: response.data[0].box_art_url,
          });
        }
      } catch (error) {
        console.log("ERROR", error);
      }
    })
  );
  return gameListWithTwitchInfo;
};

const getCurrentViewers = async (
  gameList: {
    appid: number;
    name: string;
    currentPlayers: number;
    twitchId: string | null;
    twitchName: string | null;
    twitch_box_art_url: string | null;
  }[],
  twitchAppId: string
) => {
  const gamesWithViewCount: {
    appid: number;
    name: string;
    currentPlayers: number;
    twitchId: string | null;
    twitchName: string | null;
    twitch_box_art_url: string | null;
    view_count: number;
  }[] = [];
  await Promise.all(
    gameList.map(async (game) => {
      let totalViewCount = 0;
      const options = {
        method: "GET",
        uri: twitchURLS.getStreams + `?game_id=${game.twitchId}`,
        headers: {
          Authorization: `Bearer ${twitchAppId}`,
          "Client-ID": TWITCH_CLIENT_ID,
        },
        first: 100,
        json: true,
      };

      if (game.twitchId !== null) {
        try {
          const response: {
            data: {
              game_id: string;
              id: string;
              language: string;
              pagination: string;
              started_at: string;
              tag_ids: string;
              thumbnail_url: string;
              title: string;
              user_id: string;
              user_name: string;
              viewer_count: string;
            }[];
          } = await request(options);

          for (const stream in response.data) {
            totalViewCount += parseInt(response.data[stream].viewer_count, 10);
          }

          gamesWithViewCount.push({ ...game, view_count: totalViewCount });
        } catch (error) {
          console.log(error);
        }
      }
    })
  );

  return gamesWithViewCount;
};
