import { NearestPointOnLine } from '@turf/nearest-point-on-line';
import { LocationObject } from 'expo-location';
import React, { useContext } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, Polygon, Polyline } from 'react-native-maps';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { ToniCurrentLocation } from '@/components/atoms/icons/ToniCurrentLocation';
import { ToniLocation } from '@/components/atoms/icons/ToniLocation';
import { DecodedShapeProps } from '@/types/Types';

interface NavigationMapMapProps {
  origin?: [number, number];
  destination?: [number, number];
  snapshot?: NearestPointOnLine | null | undefined;
  decodedShape?: DecodedShapeProps | null;
  bbox?: { latitude: number; longitude: number }[] | null | undefined;
  updateCurrentLocation: (location: any) => void;
  currentLocation: LocationObject | undefined;
  newLine: [number, number][] | null | undefined;
}

const styles = StyleSheet.create({
  controls: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export function NavigationMap({
  origin,
  snapshot,
  destination,
  decodedShape,
  newLine,
  bbox,
  updateCurrentLocation,
  currentLocation,
}: NavigationMapMapProps) {
  const { theme } = useContext(ThemeContext);

  // const [mockLocation, setMockLocation] = useState(origin || [0, 0]); // Start from the origin or default to (0, 0)

  // Move mock location based on direction
  const moveLocation = (direction: string) => {
    const step = 0.00005; // Adjust step size for movement
    if (!currentLocation) {
      return;
    }
    let newLocation: [number, number];
    switch (direction) {
      case 'up':
        newLocation = [
          currentLocation.coords.latitude + step,
          currentLocation.coords.longitude,
        ];
        break;
      case 'down':
        newLocation = [
          currentLocation.coords.latitude - step,
          currentLocation.coords.longitude,
        ];
        break;
      case 'left':
        newLocation = [
          currentLocation.coords.latitude,
          currentLocation.coords.longitude - step,
        ];
        break;
      case 'right':
        newLocation = [
          currentLocation.coords.latitude,
          currentLocation.coords.longitude + step,
        ];
        break;
      default:
        newLocation = [
          currentLocation.coords.latitude,
          currentLocation.coords.longitude,
        ];
    }
    updateCurrentLocation({
      coords: {
        latitude: newLocation[0],
        longitude: newLocation[1],
        accuracy: 5, // Example accuracy value
        heading: 0, // Example heading value
        speed: 0, // Example speed value
        altitude: 0, // Example altitude value
        altitudeAccuracy: 0, // Example altitude accuracy value
        timestamp: Date.now(), // Example timestamp value
      },
    });
  };
  const screenHeight = Dimensions.get('window').height;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1, height: 0.68 * screenHeight }}
        initialRegion={{
          latitude: origin ? origin[0] : 0,
          longitude: origin ? origin[1] : 0,
          latitudeDelta: 0.022,
          longitudeDelta: 0.022,
        }}
        showsUserLocation
        rotateEnabled
        showsCompass
      >
        {/* Mock Location Marker */}
        <Marker
          coordinate={{
            latitude: currentLocation ? currentLocation.coords.latitude : 0,
            longitude: currentLocation ? currentLocation.coords.longitude : 0,
          }}
          title="Mock Location"
          description="Simulated location"
        >
          <ToniCurrentLocation
            width={40}
            height={40}
            fill={themes.external[`--${theme}-mode-icon-button`]}
            stroke={themes.external[`--${theme}-mode-icon-button`]}
            strokeWidth={3}
          />
        </Marker>

        {/* Snapshot Marker */}
        {snapshot && origin && (
          <Marker
            coordinate={{
              latitude: snapshot.geometry.coordinates[0],
              longitude: snapshot.geometry.coordinates[1],
            }}
            title="Nearest Point"
            description="You are here"
          >
            <ToniCurrentLocation
              width={40}
              height={40}
              fill={themes.external[`--${theme}-mode-icon-button`]}
              stroke={themes.external[`--${theme}-mode-icon-button`]}
              strokeWidth={3}
            />
          </Marker>
        )}

        {/* Destination Marker */}
        {destination && (
          <Marker
            coordinate={{
              latitude: destination[0],
              longitude: destination[1],
            }}
            title="Current Location"
            description="You are here"
          >
            <ToniLocation
              width={40}
              height={40}
              stroke={themes.external[`--accent`]}
              fillInner={themes.external[`--accent`]}
              strokeWidth={3}
            />
          </Marker>
        )}

        {/* Bounding Box */}
        {bbox && <Polygon key={1} coordinates={bbox} />}

        {decodedShape?.coordinates?.map((coord, index) => {
          if (index === 0) {
            return null;
          }

          return (
            <Polyline
              key={coord.toString()}
              coordinates={[
                {
                  latitude: decodedShape?.coordinates[index - 1][0],
                  longitude: decodedShape?.coordinates[index - 1][1],
                },
                {
                  latitude: coord[0],
                  longitude: coord[1],
                },
              ]}
              strokeColor={themes.external[`--${theme}-mode-primary-inverted`]}
              strokeWidth={6}
              zIndex={97}
            />
          );
        })}

        {/* Decoded Shape */}
        {newLine?.map((coord, index) => {
          if (index === 0) {
            return null;
          }

          return (
            <Polyline
              key={coord.toString()}
              coordinates={[
                {
                  latitude: newLine[index - 1][0],
                  longitude: newLine[index - 1][1],
                },
                {
                  latitude: coord[0],
                  longitude: coord[1],
                },
              ]}
              strokeColor={themes.external[`--${theme}-mode-primary`]}
              strokeWidth={6}
              zIndex={98}
            />
          );
        })}
      </MapView>

      {/* Navigation Buttons */}
      <View style={styles.controls}>
        <View style={styles.row}>
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.button}
            onPress={() => moveLocation('up')}
          >
            <Text style={styles.buttonText}>↑</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.button}
            onPress={() => moveLocation('left')}
          >
            <Text style={styles.buttonText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.button}
            onPress={() => moveLocation('down')}
          >
            <Text style={styles.buttonText}>↓</Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.button}
            onPress={() => moveLocation('right')}
          >
            <Text style={styles.buttonText}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
