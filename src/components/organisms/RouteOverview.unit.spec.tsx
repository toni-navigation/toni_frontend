import { fireEvent, render } from '@testing-library/react-native';
import { router } from 'expo-router';
import React from 'react';

import { RouteOverview } from '@/components/organisms/RouteOverview';

jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
  },
}));

describe('RouteOverview', () => {
  it('renders correctly with given summary', () => {
    const summary = { length: 10, time: 600 };
    const { getByText } = render(
      <RouteOverview
        onCloseClick={() => {}}
        // @ts-ignore
        summary={summary}
      />
    );
    expect(getByText('Deine Route beträgt:').children[0]).toEqual(
      'Deine Route beträgt:'
    );
    expect(getByText('10 km').children[0]).toEqual('10');
    expect(getByText('10 Minuten').children[0]).toEqual('10');
  });

  it('calls onCloseClick when Weiter button is pressed', () => {
    const onCloseClick = jest.fn();
    const { getByText } = render(
      <RouteOverview
        onCloseClick={onCloseClick}
        // @ts-ignore
        summary={{ length: 10, time: 600 }}
      />
    );

    fireEvent.press(getByText('Weiter'));

    expect(onCloseClick).toHaveBeenCalled();
  });

  it('calls router.back when Zurück button is pressed', () => {
    const { getByText } = render(
      <RouteOverview
        onCloseClick={() => {}}
        // @ts-ignore
        summary={{ length: 10, time: 600 }}
      />
    );

    fireEvent.press(getByText('Zurück'));

    expect(router.back).toHaveBeenCalled();
  });
});
