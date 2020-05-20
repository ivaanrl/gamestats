import { all, fork } from "redux-saga/effects";
import { watchGetTopStreams } from "../reducers/games.sagas";

export const rootSaga = function* root() {
  yield all([fork(watchGetTopStreams)]);
};
