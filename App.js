import React from 'react';
import { StyleSheet, View } from 'react-native';
import MainScreen from './src/app/screens/MainScreen'

export default function App() {
  return (
    <View style={styles.container}>
      <MainScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
});
