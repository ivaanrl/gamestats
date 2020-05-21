import { BaseAction, ActionTypes } from "../actions/types";
import { gameDetails } from "./games.reducer";

export interface GameInfoState {
  appid: number;
  name: string;
  currentPlayers: number;
  twitch_id: string | null;
  twitch_name: string | null;
  twitch_box_art_url?: string | null | undefined;
  viewer_count: string | number | null;
  thumbnail_url?: string | undefined;
  top_streamer?:
    | {
        viewer_count: string;
        streamer_id: string;
      }
    | undefined;
  appdetails?: gameDetails;
}

const initialState = {
  appid: 0,
  name: "",
  currentPlayers: 0,
  twitch_id: null,
  twitch_name: null,
  twitch_box_art_url: null,
  viewer_count: null,
};

export const gameInfoReducer = (
  state: GameInfoState = initialState,
  action: BaseAction
) => {
  switch (action.type) {
    case ActionTypes.ADD_GAME_INFO:
      return action.payload;
    default:
      return state;
  }
};
