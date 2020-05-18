import { steamURLS } from "../../config/steamUrls";
import request from "request-promise";
import { sleep } from "../shared/sleep";
import { keys } from "../../config/keys";

const { STEAM_CLIENT_ID } = keys();

export const getGameCurrentPlayers = async (
  gameList: { appid: number; name: string }[],
  searchedGame: string
) => {
  const searchResult: {
    appid: number;
    name: string;
    currentPlayers: number;
  }[] = [];

  try {
    await Promise.all(
      gameList.map(async (game) => {
        if (game.name.toLowerCase().includes(searchedGame)) {
          const options = {
            uri: steamURLS.getGameCurrentPlayers + game.appid,
            json: true,
          };

          const response = await request(options);
          searchResult.push({
            appid: game.appid,
            name: game.name.replace(/\W+/g, " "),
            currentPlayers: response.response.player_count,
          });
        }
      })
    );
  } catch (error) {
    console.log("There was an error getting the game info.");
  }

  //Need to find better solution
  await sleep(500); //makes server wait until requests to Steam API are solved.
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

export const getGameDetails = async (
  searchedGames: {
    appid: number;
    name: string;
    currentPlayers: number;
    twitchId: string | null;
    twitchName: string | null;
    twitch_box_art_url: string | null;
    view_count: number | null;
  }[]
) => {
  const finalSearchResult: {
    appid: number;
    name: string;
    currentPlayers: number;
    twitchId: string | null;
    twitchName: string | null;
    twitch_box_art_url: string | null;
    view_count: number | null;
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
              if (
                body[game.appid].data !== undefined &&
                body[game.appid].data.type == "game"
              ) {
                finalSearchResult.push({
                  ...game,
                  appdetails: body[game.appid].data,
                });
              }
            }
          }
        );
      })
    );
  } catch (error) {
    console.log(error);
  }
  return finalSearchResult;
};
