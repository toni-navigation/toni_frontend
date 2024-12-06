import { useMutation } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native';

import { favoritesControllerCreateFavoriteMutation } from '@/services/api-backend/@tanstack/react-query.gen';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import { useTripStore } from '@/store/useTripStore';

export default function FavoritePage() {
  const { changeDestination } = useTripStore((state) => state.actions);
  const [showPopUp, setShowPopUp] = React.useState(false);

  const { favorite } = useLocalSearchParams();
  const { mutate, error, isError, data, isPending } = useMutation({
    ...favoritesControllerCreateFavoriteMutation(),
    onSuccess: (successData) => {
      console.log('Yei');
      // console.log(successData);
      // if (!successData) {
      //   Alert.alert('Registration Failed', 'Please try again');
      //
      //   return;
      // }
      // onLogin(successData.accessToken);
      // addUser(successData.user);
      // router.replace('/home');
    },
  });
  // const favorite = favorites.find((favoriteItem) => favoriteItem.id === id);
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );

  const navigateToTrip = (params: {
    origin: number[];
    destination: number[];
  }) => {
    router.push({ pathname: `/trip`, params });
  };

  // const startNavigationFromFavorite = async () => {
  //   if (currentLocation && favorite?.address) {
  //     changeDestination(favorite.address);
  //     navigateToTrip({
  //       origin: [
  //         currentLocation.coords.longitude,
  //         currentLocation.coords.latitude,
  //       ],
  //       destination: favorite.address.geometry.coordinates,
  //     });
  //   }
  // };

  if (!favorite) return null;

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* eslint-disable-next-line react/jsx-no-undef */}
      {/* <ScrollView className="px-8 my-8" keyboardShouldPersistTaps="always"> */}
      {/*  <Header>{favorite.title}</Header> */}
      {/*  <View> */}
      {/*    {favorite.address?.properties?.name && ( */}
      {/*      <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor"> */}
      {/*        {favorite.address?.properties?.name} */}
      {/*      </Text> */}
      {/*    )} */}
      {/*    {favorite.address?.properties?.street && ( */}
      {/*      <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor"> */}
      {/*        Straße: {favorite.address?.properties?.street} */}
      {/*      </Text> */}
      {/*    )} */}
      {/*    {favorite.address?.properties?.housenumber && ( */}
      {/*      <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor"> */}
      {/*        Hausnummer: {favorite.address?.properties?.housenumber} */}
      {/*      </Text> */}
      {/*    )} */}
      {/*    {favorite.address?.properties?.postcode && ( */}
      {/*      <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor"> */}
      {/*        Postleitzahl: {favorite.address?.properties?.postcode} */}
      {/*      </Text> */}
      {/*    )} */}
      {/*    {favorite.address?.properties?.city && ( */}
      {/*      <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor"> */}
      {/*        Ort: {favorite.address?.properties?.city} */}
      {/*      </Text> */}
      {/*    )} */}

      {/*    <PopUp */}
      {/*      visible={showPopUp} */}
      {/*      onClickButtonText="Ja" */}
      {/*      onCloseClick={() => setShowPopUp(false)} */}
      {/*      onCloseButtonText="Nein" */}
      {/*      onDismiss={() => {}} */}
      {/*      onClick={() => { */}
      {/*        setShowPopUp(false); */}
      {/*        deleteFavorite(favorite.id); */}
      {/*        router.push('/favorites'); */}
      {/*      }} */}
      {/*    > */}
      {/*      <Text className="text-2xl text-text-col font-atkinsonRegular text-center text-background"> */}
      {/*        Möchtest du den Favorit {favorite.title} wirklich löschen? */}
      {/*      </Text> */}
      {/*    </PopUp> */}
      {/*  </View> */}
      {/* </ScrollView> */}
      {/* <View className="mx-5 mb-8"> */}
      {/*  <Button */}
      {/*    width="full" */}
      {/*    onPress={() => { */}
      {/*      router.push({ */}
      {/*        pathname: '/favorites/create', */}
      {/*        params: { */}
      {/*          id: favorite.id, */}
      {/*          title: favorite.title, */}
      {/*          address: JSON.stringify(favorite.address), */}
      {/*        }, */}
      {/*      }); */}
      {/*    }} */}
      {/*    buttonType="primaryOutline" */}
      {/*  > */}
      {/*    Bearbeiten */}
      {/*  </Button> */}
      {/*  <Button */}
      {/*    onPress={() => { */}
      {/*      setShowPopUp(true); */}
      {/*    }} */}
      {/*    buttonType="primaryOutline" */}
      {/*    width="full" */}
      {/*  > */}
      {/*    Löschen */}
      {/*  </Button> */}
      {/*  <Button */}
      {/*    onPress={() => startNavigationFromFavorite()} */}
      {/*    disabled={favorite.address === undefined} */}
      {/*    buttonType="accent" */}
      {/*    width="full" */}
      {/*  > */}
      {/*    Route starten */}
      {/*  </Button> */}
      {/* </View> */}
    </SafeAreaView>
  );
}
