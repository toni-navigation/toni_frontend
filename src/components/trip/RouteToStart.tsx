import bearing from '@turf/bearing';
import { point } from '@turf/helpers';
import { Magnetometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Map } from '@/components/organisms/Map';
import { CurrentLocationProps } from '@/types/Types';

interface RouteToStartProps {
  distanceToStart: number;
  currentLocation: CurrentLocationProps;
  startLocation: number[];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});
export function RouteToStart({
  distanceToStart,
  currentLocation,
  startLocation,
}: RouteToStartProps) {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState<any>(null);

  const calculateOrientation = (_x: number, _y: number) => {
    const angle = Math.atan2(_y, _x);

    return (angle * 180) / Math.PI;
  };
  const directionToMove = (_bearing: number, _orientation: number) => {
    const difference = _bearing - _orientation;
    if (Math.abs(difference) < 20) {
      return 'forward';
    }
    if (difference > 0) {
      return 'left';
    }

    return 'right';
  };
  useEffect(() => {}, [x, y, z, currentLocation]);
  const subscribe = () => {
    Magnetometer.setUpdateInterval(1000);
    setSubscription(
      Magnetometer.addListener((result) => {
        setData(result);
      })
    );
  };

  const unsubscribe = () => {
    if (subscription) {
      subscription.remove();
    }
    setSubscription(null);
  };

  const point1 = point([
    currentLocation.coords.latitude,
    currentLocation.coords.longitude,
  ]);
  const point2 = point(startLocation);

  const orientation = calculateOrientation(x, y);
  const direction = directionToMove(bearing(point1, point2), orientation);

  if (subscription) {
    console.log('Move', direction, distanceToStart);
  }

  return (
    <SafeAreaView className="flex-1 bg-background-light">
      <View style={styles.container}>
        {/* <Text style={styles.text}>Magnetometer:</Text> */}
        {/* <Text style={styles.text}>x: {x}</Text> */}
        {/* <Text style={styles.text}>y: {y}</Text> */}
        {/* <Text style={styles.text}>z: {z}</Text> */}

        {/* <View style={styles.buttonContainer}> */}
        {/*  <TouchableOpacity */}
        {/*    accessibilityRole="button" */}
        {/*    onPress={subscription ? unsubscribe : subscribe} */}
        {/*    style={styles.button} */}
        {/*  > */}
        {/*    <Text>{subscription ? 'On' : 'Off'}</Text> */}
        {/*  </TouchableOpacity> */}
        {/*  <TouchableOpacity */}
        {/*    accessibilityRole="button" */}
        {/*    onPress={subscribe} */}
        {/*    style={[styles.button, styles.middleButton]} */}
        {/*  > */}
        {/*    <Text>Start</Text> */}
        {/*  </TouchableOpacity> */}
        {/*  <TouchableOpacity */}
        {/*    accessibilityRole="button" */}
        {/*    onPress={unsubscribe} */}
        {/*    style={styles.button} */}
        {/*  > */}
        {/*    <Text>Stop</Text> */}
        {/*  </TouchableOpacity> */}
        {/* </View> */}
        <Text>Dein GPS SIgnal beträgt: {currentLocation.coords.accuracy}</Text>
        {subscription && (
          <View>
            <Text>
              Bewege dich {direction} um {distanceToStart} Meter zu überwinden.
            </Text>
          </View>
        )}
      </View>
      <Map
        origin={{
          lat: currentLocation.coords.latitude,
          lon: currentLocation.coords.longitude,
        }}
        destination={{ lat: startLocation[0], lon: startLocation[1] }}
      />
      <Text>
        Der Startpunkt ist {distanceToStart} Meter entfernt. Klicke auf den
        Button und wir führen dich zum Startpunkt.
      </Text>
      <Button disabled={false} onPress={subscribe} buttonType="primary">
        Startpunkt
      </Button>
    </SafeAreaView>
  );
}
