export const directionToMove = (_bearing: number, _orientation: number) => {
  const difference = _bearing - _orientation;

  return Math.abs(difference) < 10;
};
