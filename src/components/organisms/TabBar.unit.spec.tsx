import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { TabBar } from '@/components/organisms/TabBar';

describe('TabBar', () => {
  it('renders correctly with given activePage and colorscheme', () => {
    const { getByText } = render(<TabBar setPage={() => {}} activePage={0} />);

    expect(getByText('Übersicht')).toBeTruthy();
    expect(getByText('Navigation')).toBeTruthy();
  });

  it('calls setPage when Übersicht button is pressed and not active', () => {
    const setPage = jest.fn();
    const { getByText } = render(<TabBar setPage={setPage} activePage={1} />);

    fireEvent.press(getByText('Übersicht'));

    expect(setPage).toHaveBeenCalledWith(0);
  });

  it('does not call setPage when Übersicht button is pressed and active', () => {
    const setPage = jest.fn();
    const { getByText } = render(<TabBar setPage={setPage} activePage={0} />);

    fireEvent.press(getByText('Übersicht'));

    expect(setPage).not.toHaveBeenCalled();
  });

  it('calls setPage when Navigation button is pressed and not active', () => {
    const setPage = jest.fn();
    const { getByText } = render(<TabBar setPage={setPage} activePage={0} />);

    fireEvent.press(getByText('Navigation'));

    expect(setPage).toHaveBeenCalledWith(1);
  });

  it('does not call setPage when Navigation button is pressed and active', () => {
    const setPage = jest.fn();
    const { getByText } = render(<TabBar setPage={setPage} activePage={1} />);

    fireEvent.press(getByText('Navigation'));

    expect(setPage).not.toHaveBeenCalled();
  });
});
