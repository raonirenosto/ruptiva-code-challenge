import React, { useEffect } from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import MainScreen from './src/app/screens/MainScreen'
import { FirebaseInit } from './src/api/CloudFirestore';

export default function App() {
  LogBox.ignoreAllLogs(true)
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
