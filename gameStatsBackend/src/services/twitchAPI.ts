import { twitchURLS } from "../../config/twitchUrls";
import request from "request-promise";
import { keys } from "../../config/keys";

const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = keys();

export const getTwitchAppId = async () => {
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

export const getTwitchGamesIdByName = async (
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

export const getCurrentViewers = async (
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
    view_count: number | null;
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
      } else {
        gamesWithViewCount.push({ ...game, view_count: null });
      }
    })
  );

  return gamesWithViewCount;
};
