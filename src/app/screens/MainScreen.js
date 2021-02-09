import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Form from '../components/Form/Form';

const MainScreen = () => {
  return <View>
    <Text style={styles.text}>Digite seus dados: </Text>
    <Form />
  </View>
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    margin: 10
  }
});

export default MainScreen;