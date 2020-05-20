import { ActionTypes } from "./types";

export const getTopStreams = () => ({
  type: ActionTypes.GET_TOP_STREAMS,
  payload: null,
});

export const getTopStreamsCompletedAction = (topStreams: any) => ({
  type: ActionTypes.GET_TOP_STREAMS_COMPLETED_ACTION,
  payload: topStreams,
});
