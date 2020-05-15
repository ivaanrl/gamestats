import { ActionTypes } from "../actions/types";
import { takeEvery, call } from "redux-saga/effects";
import request from "superagent";

export function* watchGetMostPlayed() {
  yield takeEvery(ActionTypes.getMostPlayed, getMostPlayed);
}

function* getMostPlayed() {
  try {
    const mostPlayedGame = yield call(request.get, "/api/example");
    console.log(mostPlayedGame);
  } catch (error) {
    console.log(error);
  }
}
