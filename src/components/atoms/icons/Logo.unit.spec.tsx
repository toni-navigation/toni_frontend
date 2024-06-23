import { render } from '@testing-library/react-native';
import React from 'react';

import { Logo } from '@/components/atoms/icons/Logo';

describe('Logo component', () => {
  it('renders correctly with default props and colorscheme light', async () => {
    const { getByTestId, getAllByTestId } = render(<Logo />);

    const svg = getByTestId('Logo');
    expect(svg.props.width).toBe(24);
    expect(svg.props.height).toBe(24);

    const paths = getAllByTestId('LogoPath');
    expect(paths.length).toBe(4);
    expect(paths[0].props.fill).toBeTruthy();
    expect(paths[1].props.fill).toBeTruthy();
    expect(paths[2].props.fill).toBeTruthy();
    expect(paths[3].props.fill).toBeTruthy();

    expect(paths[0].props.d).toBe(
      'm108.49218,82.10544c-32.21282,0-56.92187,25.32105-56.92187,56.51941,0,5.22521.68423,10.28129,2.00474,15.07986.9661,3.59886,2.28641,7.05285,3.92083,10.32158,1.02252,2.05299,2.16592,4.04171,3.42981,5.94984,10.04787,15.16841,27.32569,25.16803,47.56649,25.16803,19.54831,0,36.34318-9.3314,46.5198-23.64644,2.0128-2.842,3.77596-5.87731,5.24939-9.08973,1.28807-2.78578,2.33477-5.69215,3.14794-8.70329,1.32051-4.79858,2.00474-9.85465,2.00474-15.07986,0-31.19836-24.71711-56.51941-56.92187-56.51941Zm32.33233,65.39754c-.47883,1.77279-1.09505,3.48397-1.85339,5.12408-.86743,1.89132-1.90547,3.67837-3.09055,5.35151-5.99141,8.428-15.87928,13.92182-27.38839,13.92182-11.91678,0-22.08888-5.88724-28.00462-14.81755-.74418-1.12345-1.41721-2.29427-2.01928-3.50294-.96217-1.92454-1.73958-3.95798-2.30843-6.07692-.7774-2.82509-1.18016-5.80183-1.18016-8.87813,0-18.36796,14.54738-33.27563,33.51249-33.27563,18.9604,0,33.51249,14.90767,33.51249,33.27563,0,3.0763-.40276,6.05304-1.18016,8.87813Z'
    );
    expect(paths[1].props.d).toBe(
      'm155.01277,188.07151l-46.60264,80.71687-47.48446-82.24634c10.04824,15.17301,27.32813,25.17019,47.56557,25.17019,19.5485,0,36.34222-9.32864,46.52153-23.64072Z'
    );
    expect(paths[2].props.d).toBe(
      'm135.29892,60.76932c-27.36259-9.44776-55.70388-2.76382-75.07576,15.25846l2.27111,10.20292c17.04154-18.66817,43.99237-26.14967,69.94793-17.18774,25.94344,8.95775,42.52857,31.45811,44.44157,56.6445l8.06689-6.62026c-4.1298-26.1237-22.31339-48.8585-49.65174-58.29789Z'
    );
    expect(paths[3].props.d).toBe(
      'm142.22443,40.71167c-30.99097-10.70056-62.97671-5.30146-87.18488,11.97696l2.09388,9.41417c22.29988-17.46111,52.75595-23.29576,82.23428-13.11749,29.46563,10.17389,49.82593,33.54118,56.60563,61.02964l7.45636-6.11666c-8.39417-28.52212-30.21488-52.48627-61.20527-63.18663Z'
    );
  });

  it('renders correctly with custom props', async () => {
    const { getByTestId, getAllByTestId } = render(
      <Logo width={32} height={32} viewBox="0 0 255 304" />
    );

    const svg = getByTestId('Logo');
    expect(svg.props.width).toBe(32);
    expect(svg.props.height).toBe(32);
    // expect(svg.props.viewBox).toBe('0 0 255 304');

    const paths = getAllByTestId('LogoPath');
    expect(paths.length).toBe(4);
    expect(paths[0].props.fill).toBeTruthy();
    expect(paths[1].props.fill).toBeTruthy();
    expect(paths[2].props.fill).toBeTruthy();
    expect(paths[3].props.fill).toBeTruthy();
  });
});
