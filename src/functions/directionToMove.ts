export const directionToMove = (bearing: number, orientation: number) => {
  const difference = bearing - orientation;

  return Math.abs(difference) < 10;
};
