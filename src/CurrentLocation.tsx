import React from 'react';

function CurrentLocation(props: { currentLocation: GeolocationCoordinates }) {
  const { currentLocation } = props;
  return (
    <div>
      <div>
        Längen-/Breitengrad: {currentLocation.latitude},{' '}
        {currentLocation.longitude}
      </div>
      <div>accuary:{currentLocation.accuracy}</div>
      <div>altitude:{currentLocation.altitude}</div>
      <div>altitudeAccuracy: {currentLocation.altitudeAccuracy}</div>
      <div>heading:{currentLocation.heading}</div>
      <div>speed:{currentLocation.speed}</div>
    </div>
  );
}

export default CurrentLocation;
