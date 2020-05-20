export const ActionTypes = {
  GET_TOP_STREAMS: "[0] Request top streams and game information to API",
  GET_TOP_STREAMS_COMPLETED_ACTION: "[1] API returned list of top streams",
};

export interface BaseAction {
  type: string;
  payload?: any;
}
