// import { render } from '@testing-library/react-native';
// import React from 'react';
//
// import { CalibrationMode } from '@/components/calibration/CalibrationMode';
//
// describe('CalibrationMode', () => {
//   it('renders correctly', () => {
//     const { getByText } = render(<CalibrationMode steps={5} />);
//     expect(getByText('Schritte: 5')).toBeTruthy();
//   });
//
//   it('renders correctly with zero steps', () => {
//     const { getByText } = render(<CalibrationMode steps={0} />);
//     expect(getByText('Schritte: 0')).toBeTruthy();
//   });
//
//   it('renders the correct steps text', () => {
//     const steps = 5;
//     const { getByText } = render(<CalibrationMode steps={steps} />);
//     expect(getByText(`Schritte: ${steps}`).props.children).toEqual([
//       'Schritte: ',
//       5,
//     ]);
//   });
// });
