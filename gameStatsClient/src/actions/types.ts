export const ActionTypes = {
  GET_TOP_STREAMS: "[0] Request top streams and game information to API",
  GET_TOP_STREAMS_COMPLETED_ACTION: "[1] API returned list of top streams",
  ADD_GAME_INFO: "[2] Add game info to app state.",
};

export interface BaseAction {
  type: string;
  payload?: any;
}
