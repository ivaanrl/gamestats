import { ActionTypes, BaseAction } from "../actions/types";

export interface gameDetails {
  type: string;
  name: string;
  steam_appid: number;
  required_age: number;
  is_free: boolean;
  controller_support?: string;
  dlc?: number[];
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  fullgame?: string;
  supported_languages: string;
  reviews: string;
  header_image: string;
  website: string;
  pc_requirements: {
    minimum: string;
    recommended: string;
  };
  mac_requirements: {
    minimum: string;
    recommended: string;
  };
  linux_requirements: {
    minimum: string;
    recommended: string;
  };
  legal_notice?: string;
  developers?: string[];
  publishers: string[];
  demos?: {
    appid: number;
    description: string;
  };
  price_overview?: {
    currency: string;
    initial: number;
    final: number;
    discount_percent: number;
    initial_formatted: string;
    final_formatted: string;
  };
  package_groups: {
    name: string;
    title: string;
    description: string;
    selection_text: string;
    display_type: number;
    is_recurring_subscription: string;
    subs: {
      packageid: number;
      percent_savings_text: string;
      percent_savings: number;
      option_text: string;
      option_description: string;
      can_get_free_license: false;
      price_in_cents_with_discount: number;
    }[];
  }[];
  platforms: {
    windows: boolean;
    max: boolean;
    linux: boolean;
  };
  metacritic?: {
    score: number;
    url: string;
  };
  categories?: {
    id: number;
    description: string;
  }[];
  genres?: {
    id: string;
    description: string;
  }[];
  screenshots?: {
    id: number;
    path_thumbnail: string;
    path_full: string;
  }[];
  movies?: {
    id: number;
    name: string;
    thumbnail: string;
    webm: {
      480: string;
      max: string;
    };
    highlight: boolean;
  }[];
  recommendations?: {
    total: number;
  };
  achievements?: {
    total: number;
    highlighted: {
      name: string;
      path: string;
    }[];
  };
  release_data: {
    coming_soon: boolean;
    date: string;
  };
  support_info: {
    url: string;
    email: string;
  };
  background: string;
  content_descriptors: {
    id: string[];
    notes: null;
  };
}

export type GamesReducerState = {
  appid: number;
  name: string;
  currentPlayers: number;
  twitch_id: string | null;
  twitch_name: string | null;
  twitch_box_art_url?: string | null | undefined;
  viewer_count: string | number | null;
  thumbnail_url?: string | undefined;
  top_streamer?:
    | {
        viewer_count: string;
        streamer_id: string;
      }
    | undefined;
  appdetails: gameDetails;
}[];

export const gamesReducer = (
  state: GamesReducerState = [],
  action: BaseAction
) => {
  switch (action.type) {
    case ActionTypes.GET_TOP_STREAMS_COMPLETED_ACTION:
      return action.payload;
    default:
      return state;
  }
};
