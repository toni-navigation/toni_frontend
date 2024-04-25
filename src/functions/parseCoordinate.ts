export const parseCoordinate = (coordinateString: string | undefined) => {
  if (!coordinateString) {
    return {
      lat: NaN,
      lon: NaN,
    };
  }
  const [lon, lat] = coordinateString.split(',');

  return {
    lat: lat.trim() ? Number(lat) : NaN,
    lon: lon.trim() ? Number(lon) : NaN,
  };
};
