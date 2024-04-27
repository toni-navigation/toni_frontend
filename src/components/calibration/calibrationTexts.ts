import { getCalibrationValue } from '@/functions/getCalibrationValue';

export const calibrationTexts = (meters?: number[] | undefined) => [
  `Deine kalibrierte Schrittlänge beträgt`,
  'Nun kalibrieren wir gemeinsam deine Schrittlänge, damit wir dich so genau wie möglich an dein Ziel bringen können.',
  'Bitte stelle sicher, dass du deine Schritte auf einer möglichst geraden Strecke ohne Hindernisse kalibriert.\nSolltest du dir unsicher sein, bitte eine vertraute Person um Hilfe.',
  'Wenn du dir sicher bist deine Schritte konfigurieren zu können, können wir starten!',
  'Wenn du auf Start Kalibrierung klickst, ertönt eine Melodie. Laufe so lange geradeaus, bis die Melodie stoppt.',
  `Deine kalibrierte Schrittlänge beträgt ${meters ? getCalibrationValue(meters) : 0}m.\nDu kannst deine Schrittlänge jederzeit unter deinen ProfilEinstellungen neu Kalibrieren!`,
];
