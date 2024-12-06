import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor: 'invertedPrimary',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
});
// TODO: Add accessibilityLabel and accessibilityRole
export function Card({ children }: CardProps) {
  return (
    <View
      style={styles.card}
      className="rounded-3xl bg-invertedPrimary drop-shadow-[4px_4px_10px_rgba(0,0,0,1)] flex-1"
    >
      {children}
    </View>
  );
}
