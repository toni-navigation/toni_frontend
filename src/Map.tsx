import React from 'react';
import {
  Circle,
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { LocationType } from '../types/Types';
import decodePolyline from './functions/decodePolyline';

interface MapProps {
  currentLocation: GeolocationCoordinates | undefined;
  points: {
    id: number;
    location: LocationType | null;
  }[];
  shape: string | undefined;
}

function Map(props: MapProps): React.ReactElement {
  const { currentLocation, shape, points } = props;
  const route = shape ? decodePolyline(shape) : [];
  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
  });
  return (
    <MapContainer
      center={[48.19041, 8.35176]}
      zoom={8}
      style={{ height: '500px', position: 'relative' }}
      doubleClickZoom={false}
      scrollWheelZoom={false}
    >
      {currentLocation && (
        <>
          <Circle
            center={[currentLocation.latitude, currentLocation.longitude]}
            pathOptions={{ fillColor: 'blue' }}
            radius={currentLocation.accuracy}
          />
          <Marker
            position={[currentLocation.latitude, currentLocation.longitude]}
            icon={DefaultIcon}
          />
        </>
      )}
      {points !== null &&
        points.length > 0 &&
        points.map((point) => {
          if (
            !point ||
            point.location === null ||
            point.location.lat === null ||
            point.location.lon === null
          ) {
            return null;
          }
          return (
            <Marker
              key={point.id}
              position={[point.location.lat, point.location.lon]}
              icon={DefaultIcon}
            />
          );
        })}
      {route.length > 0 && <Polyline positions={route} color="blue" />}
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default Map;
