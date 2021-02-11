import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Spinner = () => {
  return (
    <View style={styles.containerStyle}>
      <ActivityIndicator size="small" color="#0000ff" />
      <Text style={styles.textStyle}>Enviando</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textStyle: {
    marginLeft: 2,
    fontSize: 16
  }
});

export default Spinner;