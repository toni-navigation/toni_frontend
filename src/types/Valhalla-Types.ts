export interface ValhallaProps {
  trip: TripProps;
  id: string;
}
export interface TripProps {
  locations: {
    type: string;
    lat: number;
    lon: number;
    side_of_street: string;
    original_index: number;
  }[];

  legs: ValhallaLegProps[];
  summary: SummaryProps;
  status_message: string;
  status: number;
  units: string;
  language: string;
}
export interface ValhallaManeuverProps {
  type: number;
  instruction: string;
  verbal_transition_alert_instruction: string;
  verbal_succinct_transition_instruction: string;
  verbal_pre_transition_instruction: string;
  verbal_post_transition_instruction: string;
  street_names: string[];
  time: number;
  length: number;
  cost: number;
  begin_shape_index: number;
  end_shape_index: number;
  travel_mode: string;
  travel_type: string;
}

export interface ValhallaLegProps {
  maneuvers: ValhallaManeuverProps[];
  summary: {
    has_time_restrictions: boolean;
    has_toll: boolean;
    has_highway: boolean;
    has_ferry: boolean;
    min_lat: number;
    min_lon: number;
    max_lat: number;
    max_lon: number;
    time: number;
    length: number;
    cost: number;
  };
  shape: string;
}

export interface SummaryProps {
  has_time_restrictions: boolean;
  has_toll: boolean;
  has_highway: boolean;
  has_ferry: boolean;
  min_lat: number;
  min_lon: number;
  max_lat: number;
  max_lon: number;
  time: number;
  length: number;
  cost: number;
}
