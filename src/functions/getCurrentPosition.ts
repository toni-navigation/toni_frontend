import * as Location from 'expo-location';

export async function getCurrentPosition() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return null;
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  return {
    coords: {
      speed: location.coords.speed,
      heading: location.coords.heading,
      accuracy: location.coords.accuracy,
      altitudeAccuracy: location.coords.altitudeAccuracy,
      altitude: location.coords.altitude,
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    },
    timestamp: location.timestamp,
  };
}
