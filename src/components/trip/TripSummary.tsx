import { router } from 'expo-router';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { ToniMap } from '@/components/atoms/icons/ToniMap';
import { PopUp } from '@/components/organisms/PopUp';
import { calculateSteps } from '@/functions/calculateSteps';
import { useTripStore } from '@/store/useTripStore';
import { useUserStore } from '@/store/useUserStore';

interface TripSummaryProps {
  summary: { time: number; length: number };
  length: number;
  onPressMap: () => void;
  setIconButton: 'accent' | 'accentOutline' | 'primary' | 'primaryOutline';
}

export function TripSummary({
  length,
  summary,
  onPressMap,
  setIconButton,
}: TripSummaryProps) {
  const { theme } = useContext(ThemeContext);
  const [showPopUp, setShowPopUp] = React.useState(false);
  const calibrationFactor = useUserStore((state) => state.calibrationFactor);
  // const convertSecondsToMinutes = (seconds: number | undefined) => {
  //   if (!seconds) return 0;
  //
  //   return Math.floor(seconds / 60);
  // };

  const getStrokeColor = (
    buttonType: 'accent' | 'accentOutline' | 'primary' | 'primaryOutline'
  ) => {
    switch (buttonType) {
      case 'primary':
        return themes.external[`--${theme}-mode-primary-inverted`];
      case 'primaryOutline':
        return themes.external[`--${theme}-mode-primary`];
      default:
        return themes.external[`--${theme}-mode-primary`];
    }
  };
  const destination = useTripStore((state) => state.destination);
  const stepsOutput = () => {
    if (!calibrationFactor) return null;

    return ` | ${calculateSteps(length, calibrationFactor)?.toFixed(0)} Schritte`;
  };

  return (
    <View className="flex items-center my-5 text-center text-textColor text-medium font-generalSansSemi">
      <PopUp
        visible={showPopUp}
        onClick={() => {
          router.back();
        }}
        onClickButtonText="Beenden"
        onCloseClick={() => setShowPopUp(false)}
        onCloseButtonText="Abbrechen"
      >
        <Text className="text-medium m-5 text-text-col text-textColor font-generalSansSemi text-center">
          Möchtest du deine Route nach
        </Text>
        <Text className="text-medium m-5 text-text-col font-generalSansSemi text-center">
          <>
            {destination?.properties?.name && (
              <>
                <Text className="text-large font-generalSansSemi flex-1 text-primary">
                  {destination?.properties?.name}
                </Text>
                {'\n'}
              </>
            )}
            {destination?.properties?.street &&
              destination?.properties.housenumber && (
                <>
                  <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor">
                    {destination?.properties?.street}{' '}
                    {destination?.properties.housenumber}
                  </Text>
                  {'\n'}
                </>
              )}
            {destination?.properties?.postcode &&
              destination?.properties.city && (
                <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor">
                  {destination?.properties?.postcode}{' '}
                  {destination?.properties?.city}
                </Text>
              )}
          </>
        </Text>
        <Text className="text-medium m-5 text-text-col font-generalSansSemi text-center text-textColor ">
          wirklich beenden und zurück zum Start?
        </Text>
      </PopUp>
      <Text className="text-textColor text-medium font-generalSansSemi">
        Noch
      </Text>
      <Text className="text-textColor text-medium font-generalSansSemi">
        {(length * 12).toFixed(0)} min
        {' | '}
        {length.toFixed(1)} km
        {stepsOutput()}
      </Text>
      <View className="mt-8 w-full flex items-center flex-row justify-center relative">
        <View className="w-2/3 flex items-center px-5">
          <Button
            onPress={() => {
              setShowPopUp(true);
            }}
            buttonType="accentOutline"
            width="full"
          >
            Beenden
          </Button>
        </View>
        <View className="absolute right-0">
          <IconButton
            icon={
              <ToniMap
                stroke={getStrokeColor(setIconButton)}
                width={25}
                height={25}
                strokeWidth={4}
              />
            }
            iconName="Karte"
            onPress={onPressMap}
            buttonType={setIconButton}
          />
        </View>
      </View>
    </View>
  );
}
