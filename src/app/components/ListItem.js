import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { DeleteUser } from '../../api/CloudFirestore';
import { Feather } from '@expo/vector-icons'; 

const ListItem = ({user, color, refreshList}) => {
  const getColor = () => {
    return (color === 'orange' ? styles.orange : styles.blue)
  }

  const format = (document) => {
    if (cpf.isValid(document)) {
      return cpf.format(document)
    } else {
      return cnpj.format(document)
    }
  }

  const onDeleteUser = (user) => {
    Alert.alert(
      'Confirmação de exclusão',
      `Deseja excluir o usuário "${user.name}"?`,
      [
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
    refreshList()
  }

  return (
    <View style={[styles.listContentStyle, getColor()]}>
      <View style={styles.itemName}>
        <Text style={{ padding: 10}}>{user.name}</Text>
      </View>
      <View style={styles.itemDocument}>
        <Text style={{padding: 10}}>{format(user.document)}</Text>
      </View>
      <View style={styles.itemIcon}>
        <TouchableOpacity onPress={ ()=> onDeleteUser(user)}>
          <Feather 
            name="trash" 
            size={18.5} 
            color="black" 
            style={{ padding: 10}}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
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

export default ListItem;