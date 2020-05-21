import { combineReducers } from "redux";
import { gamesReducer, GamesReducerState } from "./games.reducer";
import { GameInfoState, gameInfoReducer } from "./gameInfo.reducer";

export interface State {
  games: GamesReducerState;
  gameInfo: GameInfoState;
}

export const rootReducer = combineReducers<State>({
  games: gamesReducer,
  gameInfo: gameInfoReducer,
});
