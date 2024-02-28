import React from 'react';
import { Text, View } from 'react-native';

function Intro() {
  return (
    <View>
      <Text className="text-4xl font-extrabold dark:text-white">BlndFnd</Text>
      <Text className="text-lg">
        Nun kalibrieren wir deine Schrittlänge, damit die Navigation möglichst
        genau wird. Bitte stelle im Vorfeld sicher, dass die Strecke geeignet
        ist, also möglichst gerade und ohne Hindernisse. Solltest du dir
        unsicher sein, bitte eine andere Person um Hilfe. Drücke nun auf den
        Button und gehe so lange gerade aus bis die Musik stoppt.
      </Text>
    </View>
  );
}

export default Intro;
