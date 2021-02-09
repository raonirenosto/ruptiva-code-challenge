import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserForm from '../components/UserForm/UserForm';
import UserList from '../components/UserList/UserList';

const MainScreen = () => {
  return <View>
    <Text style={styles.text}>Digite seus dados: </Text>
    <UserForm />
    <UserList />
  </View>
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    margin: 10
  }
});

export default MainScreen;