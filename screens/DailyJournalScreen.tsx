import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DailyJournalScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🌸 Daily Journal</Text>
    </View>
  );
};

export default DailyJournalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 28,
    color: '#FF69B4',
    fontWeight: 'bold',
  },
});
