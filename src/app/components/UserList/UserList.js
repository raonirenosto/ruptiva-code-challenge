import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { GetUsers, DeleteUser } from '../../../api/CloudFirestore';
import { cpf, cnpj } from 'cpf-cnpj-validator'; 
import { Feather } from '@expo/vector-icons'; 

const UserList = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    async function getEffectUsers() {
      const users = await GetUsers();
      console.log(users)
      setUsers(users);
    }
    
    getEffectUsers();
  }, []);

  const  getUsers = async ()  => {
    const users = await GetUsers();
    setUsers(users);
  }

  const onDeleteUser = (user) => {

    Alert.alert(
      'Confirmação de exclusão',
      `Deseja excluir o usuário "${user.name}"?`,
      [
        {
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        { text: 'OK', onPress: () => deleteUser(user.id) }
      ],
      { cancelable: false }
    );
  }

  const deleteUser = async (id) => {
    await DeleteUser(id)
    getUsers();
  }

  const Item = (item, color) => {
    return (
      <View style={[styles.listContentStyle, color]}>
        <View style={styles.itemName}>
          <Text style={{ padding: 10}}>{item.name}</Text>
        </View>
        <View style={styles.itemDocument}>
          <Text style={{padding: 10}}>{format(item.document)}</Text>
        </View>
        <View style={styles.itemIcon}>
          <TouchableOpacity onPress={ ()=> onDeleteUser(item)}>
            <Feather name="trash" size={18.5} color="black" style={{ padding: 10}}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const format = (document) => {
    if (cpf.isValid(document)) {
      return cpf.format(document)
    } else {
      return cnpj.format(document)
    }
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
              return (
                Item(item, (index % 2) ? styles.orange : styles.blue)
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
  listContentStyle: {
    flexDirection: 'row',
  },
  itemName: {
    width: "40%"
  },
  itemDocument: {
    width: "45%"
  },
  itemIcon: {
    width: "15%",
    
    alignItems: 'center'
  },
  orange: {
    backgroundColor: '#ff6a00'
  },
  blue: {
    backgroundColor: '#00b2ff'
  }
});

export default UserList;