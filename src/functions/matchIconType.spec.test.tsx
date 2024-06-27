import { render } from '@testing-library/react-native';

import { matchIconType } from '@/functions/matchIconType';

describe('matchIconType', () => {
  const fill = '#000'; // Use any color string for testing

  test('renders ArrowRight for directionType 9', () => {
    // @ts-ignore
    const { getByTestId } = render(matchIconType(9, fill));
    expect(getByTestId('ArrowRight')).toBeTruthy();
  });

  test('renders ArrowRight for directionType 10', () => {
    // @ts-ignore
    const { getByTestId } = render(matchIconType(10, fill));
    expect(getByTestId('ArrowRight')).toBeTruthy();
  });

  test('renders ArrowRight for directionType 11', () => {
    // @ts-ignore
    const { getByTestId } = render(matchIconType(11, fill));
    expect(getByTestId('ArrowRight')).toBeTruthy();
  });

  test('renders ArrowLeft for directionType 14', () => {
    // @ts-ignore
    const { getByTestId } = render(matchIconType(14, fill));
    expect(getByTestId('ArrowLeft')).toBeTruthy();
  });

  test('renders ArrowLeft for directionType 15', () => {
    // @ts-ignore
    const { getByTestId } = render(matchIconType(15, fill));
    expect(getByTestId('ArrowLeft')).toBeTruthy();
  });

  test('renders ArrowLeft for directionType 16', () => {
    // @ts-ignore
    const { getByTestId } = render(matchIconType(16, fill));
    expect(getByTestId('ArrowLeft')).toBeTruthy();
  });

  test('renders ArrowStraight for any other directionType', () => {
    // @ts-ignore
    const { getByTestId } = render(matchIconType(999, fill)); // Use a directionType that is not defined in the switch case
    expect(getByTestId('ArrowStraight')).toBeTruthy();
  });
});
