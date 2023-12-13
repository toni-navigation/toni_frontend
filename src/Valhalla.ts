import { ValhallaConfigProps } from './Types.js';

const VALHALLA_CONFIG: ValhallaConfigProps = {
  costing: 'pedestrian',
  costing_options: {
    pedestrian: {
      exclude_polygons: [],
      use_ferry: 1,
      use_living_streets: 0.5,
      use_tracks: 0,
      service_penalty: 15,
      service_factor: 1,
      shortest: false,
      use_hills: 0.5,
      walking_speed: 5.1,
      walkway_factor: 1,
      sidewalk_factor: 1,
      alley_factor: 2,
      driveway_factor: 5,
      step_penalty: 0,
      max_hiking_difficulty: 1,
      use_lit: 0,
      transit_start_end_max_distance: 2145,
      transit_transfer_max_distance: 800,
    },
  },
  exclude_polygons: [],
  directions_options: {
    units: 'kilometers',
  },
  id: 'valhalla_directions',
};

export default VALHALLA_CONFIG;
