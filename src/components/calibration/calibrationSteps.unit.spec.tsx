// import { render } from '@testing-library/react-native';
// import { Text } from 'react-native';
//
// import { calibrationSteps } from '@/components/calibration/calibrationSteps';
//
// describe('calibrationSteps', () => {
//   it('returns correct steps with factors', () => {
//     const steps = calibrationSteps([1, 2, 3]);
//     const { getByTestId } = render(
//       steps[0].calibrationValueNode ?? <Text>-</Text>
//     );
//     expect(getByTestId('calibrationValue')).toBeTruthy();
//   });
//
//   it('returns correct steps without factors', () => {
//     const steps = calibrationSteps(undefined);
//     const { getByTestId } = render(
//       steps[0].calibrationValueNode ?? <Text>-</Text>
//     );
//     expect(getByTestId('calibrationValue')).toBeTruthy();
//   });
//
//   it('displays correct text with factors', () => {
//     const steps = calibrationSteps([1, 2, 3]);
//     const { getByText } = render(
//       steps[0].calibrationValueNode ?? <Text>-</Text>
//     );
//     expect(getByText('3 m')).toBeTruthy();
//   });
//
//   it('returns step0 correctly', () => {
//     const steps = calibrationSteps([1, 2, 3]);
//     expect(steps[0].forwardButtonText).toBe('Kalibrieren');
//     expect(steps[0].backButtonText).toBe('Zurücksetzen');
//     expect(steps[0].text).toBe('Deine kalibrierte Schrittlänge beträgt');
//   });
//
//   it('returns step1 correctly', () => {
//     const steps = calibrationSteps([1, 2, 3]);
//     expect(steps[1].forwardButtonText).toBe('Weiter');
//     expect(steps[1].backButtonText).toBe('Zurück');
//     expect(steps[1].text).toBe(
//       'Nun kalibrieren wir gemeinsam deine Schrittlänge, damit wir dich so genau wie möglich an dein Ziel bringen können.'
//     );
//   });
//
//   it('returns step2 correctly', () => {
//     const steps = calibrationSteps([1, 2, 3]);
//     expect(steps[2].forwardButtonText).toBe('Weiter');
//     expect(steps[2].backButtonText).toBe('Zurück');
//     expect(steps[2].text).toBe(
//       'Bitte stelle sicher, dass du deine Schritte auf einer möglichst geraden Strecke ohne Hindernisse kalibriert.\nSolltest du dir unsicher sein, bitte eine vertraute Person um Hilfe.'
//     );
//   });
//
//   it('returns step3 correctly', () => {
//     const steps = calibrationSteps([1, 2, 3]);
//     expect(steps[3].forwardButtonText).toBe('Weiter');
//     expect(steps[3].backButtonText).toBe('Zurück');
//     expect(steps[3].text).toBe(
//       'Wenn du dir sicher bist deine Schritte konfigurieren zu können, können wir starten!'
//     );
//   });
//
//   it('returns step4 correctly', () => {
//     const steps = calibrationSteps([1, 2, 3]);
//     expect(steps[4].forwardButtonText).toBe(undefined);
//     expect(steps[4].backButtonText).toBe('Zurück');
//     expect(steps[4].text).toBe(
//       'Wenn du auf Start Kalibrierung klickst, ertönt eine Melodie. Laufe so lange geradeaus, bis die Melodie stoppt.'
//     );
//   });
//   it('returns step5 correctly', () => {
//     const steps = calibrationSteps([1, 2, 3]);
//     expect(steps[5].forwardButtonText).toBe('Fertig');
//     expect(steps[5].backButtonText).toBe('Zurück');
//     expect(steps[5].text).toBe(
//       'Deine kalibrierte Schrittlänge beträgt 3 m.\nDu kannst deine Schrittlänge jederzeit unter deinen Profileinstellungen neu Kalibrieren!'
//     );
//   });
// });
