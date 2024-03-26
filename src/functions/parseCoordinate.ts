export const parseCoordinate = (coordinateString: string) => {
  const [lon, lat] = coordinateString.split(',');

  return { lat: Number(lat), lon: Number(lon) };
};
