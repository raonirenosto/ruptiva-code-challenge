import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

const MainScreen = () => {
  return <View>
    <UserForm />
    <UserList />
  </View>
};

const styles = StyleSheet.create({

});

export default MainScreen;