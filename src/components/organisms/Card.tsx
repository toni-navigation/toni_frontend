import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'invertedPrimary' | 'white';
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 25,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
});
// TODO: Add accessibilityLabel and accessibilityRole
export function Card({ children, color = 'invertedPrimary' }: CardProps) {
  return (
    <View
      style={styles.card}
      className={`rounded-[25px] bg-${color} drop-shadow-[4px_4px_10px_rgba(0,0,0,1)] flex-1`}
    >
      {children}
    </View>
  );
}
