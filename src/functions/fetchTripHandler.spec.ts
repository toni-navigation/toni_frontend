import axios from 'axios';

import { fetchTripHandler } from '@/functions/fetchTripHandler';

const VALHALLA_STUB: any = {
  trip: {
    locations: [
      {
        type: 'break',
        lat: 47.724156,
        lon: 13.086473,
        original_index: 0,
      },
      {
        type: 'break',
        lat: 47.723105,
        lon: 13.089052,
        original_index: 1,
      },
    ],
    legs: [
      {
        maneuvers: [
          {
            type: 1,
            instruction: 'Auf Fußweg Richtung Süden laufen.',
            verbal_succinct_transition_instruction:
              'Richtung Süden laufen. Dann Links auf Fußweg abbiegen.',
            verbal_pre_transition_instruction:
              'Auf Fußweg Richtung Süden laufen. Dann Links auf Fußweg abbiegen.',
            verbal_post_transition_instruction:
              'weniger als 10 Meter weiter der Route folgen.',
            time: 4.09,
            length: 0.005,
            cost: 4.499,
            begin_shape_index: 0,
            end_shape_index: 1,
            rough: true,
            verbal_multi_cue: true,
            travel_mode: 'pedestrian',
            travel_type: 'foot',
          },
          {
            type: 15,
            instruction: 'Links auf Fußweg abbiegen.',
            verbal_transition_alert_instruction: 'Links auf Fußweg abbiegen.',
            verbal_succinct_transition_instruction: 'Links abbiegen.',
            verbal_pre_transition_instruction: 'Links auf Fußweg abbiegen.',
            verbal_post_transition_instruction:
              '100 Meter weiter der Route folgen.',
            time: 80.635,
            length: 0.115,
            cost: 81.567,
            begin_shape_index: 1,
            end_shape_index: 8,
            travel_mode: 'pedestrian',
            travel_type: 'foot',
          },
          {
            type: 10,
            instruction: 'Rechts abbiegen.',
            verbal_transition_alert_instruction: 'Rechts abbiegen.',
            verbal_succinct_transition_instruction:
              'Rechts abbiegen. Dann Weiter auf Fußweg.',
            verbal_pre_transition_instruction:
              'Rechts abbiegen. Dann Weiter auf Fußweg.',
            verbal_post_transition_instruction:
              '10 Meter weiter der Route folgen.',
            time: 7.058,
            length: 0.01,
            cost: 7.058,
            begin_shape_index: 8,
            end_shape_index: 9,
            verbal_multi_cue: true,
            travel_mode: 'pedestrian',
            travel_type: 'foot',
          },
          {
            type: 8,
            instruction: 'Weiter auf Fußweg.',
            verbal_transition_alert_instruction: 'Weiter auf Fußweg.',
            verbal_pre_transition_instruction: 'Weiter auf Fußweg.',
            verbal_post_transition_instruction:
              '100 Meter weiter der Route folgen.',
            time: 77.294,
            length: 0.108,
            cost: 77.294,
            begin_shape_index: 9,
            end_shape_index: 22,
            travel_mode: 'pedestrian',
            travel_type: 'foot',
          },
          {
            type: 10,
            instruction: 'Rechts abbiegen.',
            verbal_transition_alert_instruction: 'Rechts abbiegen.',
            verbal_succinct_transition_instruction:
              'Rechts abbiegen. Dann Links auf Urstein Süd abbiegen.',
            verbal_pre_transition_instruction:
              'Rechts abbiegen. Dann Links auf Urstein Süd abbiegen.',
            verbal_post_transition_instruction:
              'weniger als 10 Meter weiter der Route folgen.',
            time: 4.941,
            length: 0.007,
            cost: 4.941,
            begin_shape_index: 22,
            end_shape_index: 23,
            verbal_multi_cue: true,
            travel_mode: 'pedestrian',
            travel_type: 'foot',
          },
          {
            type: 15,
            instruction: 'Links auf Urstein Süd abbiegen.',
            verbal_transition_alert_instruction:
              'Links auf Urstein Süd abbiegen.',
            verbal_succinct_transition_instruction: 'Links abbiegen.',
            verbal_pre_transition_instruction:
              'Links auf Urstein Süd abbiegen.',
            verbal_post_transition_instruction:
              '100 Meter weiter der Route folgen.',
            street_names: ['Urstein Süd'],
            time: 92.329,
            length: 0.128,
            cost: 101.592,
            begin_shape_index: 23,
            end_shape_index: 40,
            travel_mode: 'pedestrian',
            travel_type: 'foot',
          },
          {
            type: 15,
            instruction: 'Links abbiegen.',
            verbal_transition_alert_instruction: 'Links abbiegen.',
            verbal_succinct_transition_instruction: 'Links abbiegen.',
            verbal_pre_transition_instruction: 'Links abbiegen.',
            verbal_post_transition_instruction:
              '40 Meter weiter der Route folgen.',
            time: 24.592,
            length: 0.037,
            cost: 629.592,
            begin_shape_index: 40,
            end_shape_index: 47,
            travel_mode: 'pedestrian',
            travel_type: 'foot',
          },
          {
            type: 15,
            instruction: 'Links abbiegen.',
            verbal_transition_alert_instruction: 'Links abbiegen.',
            verbal_succinct_transition_instruction: 'Links abbiegen.',
            verbal_pre_transition_instruction: 'Links abbiegen.',
            verbal_post_transition_instruction:
              '30 Meter weiter der Route folgen.',
            time: 23.717,
            length: 0.028,
            cost: 24.903,
            begin_shape_index: 47,
            end_shape_index: 50,
            travel_mode: 'pedestrian',
            travel_type: 'foot',
          },
          {
            type: 15,
            instruction: 'Links auf Fußweg abbiegen.',
            verbal_transition_alert_instruction: 'Links auf Fußweg abbiegen.',
            verbal_succinct_transition_instruction:
              'Links abbiegen. Dann Das Ziel wird erreicht.',
            verbal_pre_transition_instruction:
              'Links auf Fußweg abbiegen. Dann Das Ziel wird erreicht.',
            verbal_post_transition_instruction:
              'weniger als 10 Meter weiter der Route folgen.',
            time: 2.823,
            length: 0.004,
            cost: 2.823,
            begin_shape_index: 50,
            end_shape_index: 51,
            verbal_multi_cue: true,
            travel_mode: 'pedestrian',
            travel_type: 'foot',
          },
          {
            type: 4,
            instruction: 'Ziel erreicht.',
            verbal_transition_alert_instruction: 'Das Ziel wird erreicht.',
            verbal_pre_transition_instruction: 'Ziel erreicht.',
            time: 0.0,
            length: 0.0,
            cost: 0.0,
            begin_shape_index: 51,
            end_shape_index: 51,
            travel_mode: 'pedestrian',
            travel_type: 'foot',
          },
        ],
        summary: {
          has_time_restrictions: false,
          has_toll: false,
          has_highway: false,
          has_ferry: false,
          min_lat: 47.722811,
          min_lon: 13.086416,
          max_lat: 47.724416,
          max_lon: 13.089314,
          time: 317.483,
          length: 0.443,
          cost: 934.273,
        },
        shape:
          'wez_zA_lv}WdBaAmFwUiHg]{@aEYuAYkBGoHRcMrDAzBz@xLIpLM`@?Vm@GkBGoAOmCCq@eA{SEuAAqAGuB`CUDaDNoBZkB\\wAn@kAt@qA`Aq@xAa@lA?fB`@bBdApDdCxDlBtCz@`ER|Ea@`KgBWyCKaBd@_CFmAEiCMkDc@_EoAkBqB_@qGxAPhB',
      },
    ],
    summary: {
      has_time_restrictions: false,
      has_toll: false,
      has_highway: false,
      has_ferry: false,
      min_lat: 47.722811,
      min_lon: 13.086416,
      max_lat: 47.724416,
      max_lon: 13.089314,
      time: 317.483,
      length: 0.443,
      cost: 934.273,
    },
    status_message: 'Found route between points',
    status: 0,
    units: 'kilometers',
    language: 'de-DE',
  },
  id: 'valhalla_directions',
};

jest.mock('axios');
describe('fetchTripHandler', () => {
  let mockAxios: jest.Mocked<typeof axios>;
  beforeEach(() => {
    mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create.mockReturnValue(mockAxios);
    mockAxios.get.mockResolvedValue({ data: VALHALLA_STUB });
  });
  it('does not make a request when points array is empty', async () => {
    const result = await fetchTripHandler(null!, mockAxios);

    expect(result).toBeNull();
    expect(mockAxios.get).toHaveBeenCalledTimes(0);
  });
  it('makes a request when points array is not empty', async () => {
    const points = [
      { lat: 47.724156, lon: 13.086473 },
      { lat: 47.723105, lon: 13.089052 },
    ];
    const result = await fetchTripHandler(points, mockAxios);
    expect(result).toEqual(VALHALLA_STUB);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
});
