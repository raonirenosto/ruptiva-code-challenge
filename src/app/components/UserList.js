import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import { GetUsers } from '../../api/CloudFirestore';
import ListItem from './ListItem';

const UserList = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async ()  => {
    setUsers(await GetUsers());
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Usuários</Text>
      </View>

      <View >
        <FlatList
          style={{height: '56%',}}
          data={users}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
              const color = (index % 2) ? 'orange' : 'blue'
              return (
                <ListItem 
                  user={item} 
                  color={color} 
                  refreshList={() => { getUsers() }}
                />
              )
            }
          }
          refreshing={false}
          onRefresh={ () => getUsers()}
        />
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textStyle: {
    margin: 20,
    fontSize: 16
  },
});

export default UserList;