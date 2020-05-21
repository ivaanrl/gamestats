import { ActionTypes } from "./types";
import { GameInfoState } from "../reducers/gameInfo.reducer";

export const addGameInfo = (gameInfo: GameInfoState) => ({
  type: ActionTypes.ADD_GAME_INFO,
  payload: gameInfo,
});
