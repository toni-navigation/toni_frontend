import { render } from '@testing-library/react-native';
import React from 'react';

import { TripList } from '@/components/trip/TripList';
import { CalibrationProps } from '@/types/Types';
import { ValhallaManeuverProps } from '@/types/Valhalla-Types';

describe('TripList', () => {
  const mockManeuvers: ValhallaManeuverProps[] = [
    {
      type: 1,
      instruction: 'Richtung Süden laufen.',
      verbal_succinct_transition_instruction: 'Richtung Süden laufen.',
      verbal_pre_transition_instruction: 'Richtung Süden laufen.',
      verbal_post_transition_instruction:
        'weniger als 10 Meter weiter der Route folgen.',
      time: 4.05,
      length: 0.005,
      cost: 4.455,
      begin_shape_index: 0,
      end_shape_index: 1,
      rough: true,
      travel_mode: 'pedestrian',
      travel_type: 'foot',
    },
    {
      type: 15,
      instruction: 'Links abbiegen.',
      verbal_transition_alert_instruction: 'Links abbiegen.',
      verbal_succinct_transition_instruction: 'Links abbiegen.',
      verbal_pre_transition_instruction: 'Links abbiegen.',
      verbal_post_transition_instruction: '80 Meter weiter der Route folgen.',
      time: 56.341,
      length: 0.082,
      cost: 57.272,
      begin_shape_index: 1,
      end_shape_index: 5,
      travel_mode: 'pedestrian',
      travel_type: 'foot',
    },
    {
      type: 8,
      instruction: 'Pass Urstein Süd.',
      verbal_pre_transition_instruction: 'Pass Urstein Süd.',
      time: 24.294,
      length: 0.032,
      cost: 24.294,
      begin_shape_index: 5,
      end_shape_index: 8,
      travel_mode: 'pedestrian',
      travel_type: 'foot',
    },
    {
      type: 10,
      instruction: 'Rechts auf the stairs abbiegen.',
      verbal_transition_alert_instruction: 'Rechts auf the stairs abbiegen.',
      verbal_succinct_transition_instruction: 'Rechts abbiegen.',
      verbal_pre_transition_instruction: 'Rechts auf the stairs abbiegen.',
      verbal_post_transition_instruction: '10 Meter weiter der Route folgen.',
      time: 7.058,
      length: 0.01,
      cost: 7.058,
      begin_shape_index: 8,
      end_shape_index: 9,
      travel_mode: 'pedestrian',
      travel_type: 'foot',
    },
    {
      type: 8,
      instruction: 'Weiter.',
      verbal_transition_alert_instruction: 'Weiter.',
      verbal_pre_transition_instruction: 'Weiter.',
      verbal_post_transition_instruction: '100 Meter weiter der Route folgen.',
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
      verbal_succinct_transition_instruction: 'Rechts abbiegen.',
      verbal_pre_transition_instruction: 'Rechts abbiegen.',
      verbal_post_transition_instruction:
        'weniger als 10 Meter weiter der Route folgen.',
      time: 4.941,
      length: 0.007,
      cost: 4.941,
      begin_shape_index: 22,
      end_shape_index: 23,
      travel_mode: 'pedestrian',
      travel_type: 'foot',
    },
    {
      type: 15,
      instruction: 'Links auf Urstein Süd abbiegen.',
      verbal_transition_alert_instruction: 'Links auf Urstein Süd abbiegen.',
      verbal_succinct_transition_instruction: 'Links abbiegen.',
      verbal_pre_transition_instruction: 'Links auf Urstein Süd abbiegen.',
      verbal_post_transition_instruction: '100 Meter weiter der Route folgen.',
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
      verbal_post_transition_instruction: '40 Meter weiter der Route folgen.',
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
      verbal_post_transition_instruction: '30 Meter weiter der Route folgen.',
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
      instruction: 'Links abbiegen.',
      verbal_transition_alert_instruction: 'Links abbiegen.',
      verbal_succinct_transition_instruction: 'Links abbiegen.',
      verbal_pre_transition_instruction: 'Links abbiegen.',
      verbal_post_transition_instruction:
        'weniger als 10 Meter weiter der Route folgen.',
      time: 2.823,
      length: 0.004,
      cost: 2.823,
      begin_shape_index: 50,
      end_shape_index: 51,
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
  ];
  const mockCalibration: CalibrationProps = {
    factors: [1, 2, 3],
    meters: [1, 2, 3],
  };

  it('renders correctly with given maneuvers, calibration, and colorscheme', () => {
    const { getByText } = render(
      <TripList
        maneuvers={mockManeuvers}
        calibration={mockCalibration}
        colorscheme="light"
      />
    );

    expect(getByText('1. Richtung Süden laufen.')).toBeTruthy();
    expect(getByText('4. Rechts auf the stairs abbiegen.')).toBeTruthy();
  });

  it('renders correctly with empty maneuvers', () => {
    const { queryByText } = render(
      <TripList
        maneuvers={[]}
        calibration={mockCalibration}
        colorscheme="light"
      />
    );

    expect(queryByText('1.')).toBeNull();
    expect(queryByText('2.')).toBeNull();
  });

  it('renders correctly with different colorscheme', () => {
    const { getByText } = render(
      <TripList
        maneuvers={mockManeuvers}
        calibration={mockCalibration}
        colorscheme="dark"
      />
    );
    expect(getByText('1. Richtung Süden laufen.')).toBeTruthy();
    expect(getByText('4. Rechts auf the stairs abbiegen.')).toBeTruthy();
  });
});
