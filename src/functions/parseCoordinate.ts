export const parseCoordinate = (coordinateString: string) => {
  const [lon, lat] = coordinateString.split(',');

  return {
    lat: lat.trim() ? Number(lat) : NaN,
    lon: lon.trim() ? Number(lon) : NaN,
  };
};
