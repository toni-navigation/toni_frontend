export const calculateOrientation = (x: number, y: number) => {
  const angle = Math.atan2(y, x);

  return (angle * 180) / Math.PI;
};
