import { twitchURLS } from "../../config/twitchUrls";
import request from "request-promise";
import { keys } from "../../config/keys";

const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = keys();

//get twitchAppId to be able to make requests.
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
    twitch_id: string | null;
    twitch_name: string | null;
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
            twitch_id: null,
            twitch_name: null,
            twitch_box_art_url: null,
          });
        } else {
          gameListWithTwitchInfo.push({
            ...game,
            twitch_id: response.data[0].id,
            twitch_name: response.data[0].name,
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

export const getTopStreams = async (twitchAppId: string) => {
  const options = {
    method: "GET",
    uri: twitchURLS.getStreams,
    headers: {
      Authorization: `Bearer ${twitchAppId}`,
      "Client-ID": TWITCH_CLIENT_ID,
    },
    json: true,
  };

  const topStreams: topStreamsInterface = {};

  const response: {
    data: twitchStreamInterface[];
    pagination: { cursor: string };
  } = await request(options);

  for (const stream in response.data) {
    if (response.data[stream].game_id in topStreams) {
      topStreams[response.data[stream].game_id].viewer_count +=
        response.data[stream].viewer_count;
      topStreams[response.data[stream].game_id].top_streamers.push({
        streamer_id: response.data[stream].id,
        viewer_count: response.data[stream].viewer_count,
        user_name: response.data[stream].user_name,
        title: response.data[stream].title,
        thumbnail_url: response.data[stream].thumbnail_url,
      });
    } else {
      topStreams[response.data[stream].game_id] = {
        twitch_id: response.data[stream].game_id,
        viewer_count: response.data[stream].viewer_count,
        thumbnail_url: response.data[stream].thumbnail_url,
        top_streamers: [
          {
            viewer_count: response.data[stream].viewer_count,
            streamer_id: response.data[stream].id,
            user_name: response.data[stream].user_name,
            title: response.data[stream].title,
            thumbnail_url: response.data[stream].thumbnail_url,
          },
        ],
      };
    }
  }

  return topStreams;
};

export const getGameById = async (
  gameList: topStreamsInterface,
  twitchAppId: string
) => {
  const gameListWithNames: topStreamsWithNameInterface = {};

  for (const appid in gameList) {
    const options = {
      method: "GET",
      uri: twitchURLS.getGames + `?id=${appid}`,
      headers: {
        Authorization: `Bearer ${twitchAppId}`,
        "Client-ID": TWITCH_CLIENT_ID,
      },
      json: true,
    };

    const response: {
      data: {
        id: string;
        name: string;
        box_art_url: string;
      }[];
    } = await request(options);

    if (response.data[0] !== undefined) {
      gameListWithNames[appid] = {
        ...gameList[appid],
        twitch_name: response.data[0].name,
      };
    }
  }

  return gameListWithNames;
};

export const getCurrentViewers = async (
  gameList: {
    appid: number;
    name: string;
    currentPlayers: number;
    twitch_id: string | null;
    twitch_name: string | null;
    twitch_box_art_url: string | null;
  }[],
  twitchAppId: string
) => {
  const gamesWithViewCount: {
    appid: number;
    name: string;
    currentPlayers: number;
    twitch_id: string | null;
    twitch_name: string | null;
    twitch_box_art_url: string | null;
    viewer_count: number | null;
  }[] = [];
  await Promise.all(
    gameList.map(async (game) => {
      let totalViewCount = 0;
      const options = {
        method: "GET",
        uri: twitchURLS.getStreams + `?game_id=${game.twitch_id}`,
        headers: {
          Authorization: `Bearer ${twitchAppId}`,
          "Client-ID": TWITCH_CLIENT_ID,
        },
        first: 100,
        json: true,
      };

      if (game.twitch_id !== null) {
        try {
          const response: { data: twitchStreamInterface[] } = await request(
            options
          );

          for (const stream in response.data) {
            totalViewCount += parseInt(response.data[stream].viewer_count, 10);
          }

          gamesWithViewCount.push({ ...game, viewer_count: totalViewCount });
        } catch (error) {
          console.log(error);
        }
      } else {
        gamesWithViewCount.push({ ...game, viewer_count: null });
      }
    })
  );

  return gamesWithViewCount;
};

export interface topStreamsInterface {
  [appid: string]: {
    twitch_id: string;
    viewer_count: string;
    thumbnail_url: string;
    top_streamers: {
      viewer_count: string;
      streamer_id: string;
      user_name: string;
      thumbnail_url: string;
      title: string;
    }[];
  };
}

export interface topStreamsWithNameInterface extends topStreamsInterface {
  [appid: string]: {
    twitch_id: string;
    viewer_count: string;
    thumbnail_url: string;
    top_streamers: {
      viewer_count: string;
      streamer_id: string;
      user_name: string;
      thumbnail_url: string;
      title: string;
    }[];
    twitch_name: string;
  };
}

export interface twitchStreamInterface {
  id: string;
  user_id: string;
  user_name: string;
  game_id: string;
  type: string;
  title: string;
  viewer_count: string;
  started_at: string;
  languange: string;
  thumbnail_url: string;
  tag_ids: string[];
}
[];
