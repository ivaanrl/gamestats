import { ActionTypes } from "../actions/types";
import { takeEvery, call, put } from "redux-saga/effects";
import request from "superagent";
import { getTopStreamsCompletedAction } from "../actions/games";

export function* watchGetTopStreams() {
  yield takeEvery(ActionTypes.GET_TOP_STREAMS, getTopStreams);
}

function* getTopStreams() {
  try {
    console.log("get top streams: games.sagas.ts");
    const topStreams = yield call(
      request.get,
      "http://localhost:5000/api/games/topStreams"
    );
    yield put(getTopStreamsCompletedAction(topStreams.body));
  } catch (error) {
    console.log(error);
  }
}
