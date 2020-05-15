import { all, fork } from "redux-saga/effects";
import { watchGetMostPlayed } from "../reducers/steam.reducer";

export const rootSaga = function* root() {
  yield all([fork(watchGetMostPlayed)]);
};
