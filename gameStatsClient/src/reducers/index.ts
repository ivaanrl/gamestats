import { combineReducers } from "redux";
import { gamesReducer, GamesReducerState } from "./games.reducer";

export interface State {
  games: GamesReducerState;
}

export const rootReducer = combineReducers<State>({
  games: gamesReducer,
});
