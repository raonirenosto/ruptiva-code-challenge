import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { cpf, cnpj } from 'cpf-cnpj-validator'; 

const Form = () => {
  const [ name, setName ] = useState('');
  const [ document, setDocument] = useState('');
  const [ nameError, setNameError ] = useState('');
  const [ documentError, setDocumentError ] = useState('');

  const validate = () => {
    const emptyField = 'Este campo é obrigatório'

    if (name.length === 0) {
      setNameError(emptyField);
    } else {
      setNameError('');
    }

    if (document.length === 0) {
      setDocumentError(emptyField);
    } else {
      validateDocument();
    }
  }

  const validateDocument = () => {
    if (!cpf.isValid(document) && !cnpj.isValid(document)) {
      setDocumentError('CPF ou CNPJ inválido');
      console.log('inválido')
    } else {
      if (cpf.isValid(document)) {
        setDocument(cpf.format(document));
      } else {
        setDocument(cnpj.format(document));
      }
      setDocumentError('');
    }
  }

  const onFocus = () => {
    let val = document
    val = val.split(".").join("");
	  val = val.split("-").join("");
	  val = val.split("/").join("");

    setDocument(val);
  }

  const onBlur = () => {
    validateDocument();
  }

  return (
    <View>
      <Text style={styles.textStyle}>Nome / Razão Social</Text>
      <TextInput 
        style={styles.textInputStyle}
        value={name}
        onChangeText={(newText) =>  {
          setName(newText);
        }}
      />
      { nameError.length > 0 ?  
        <Text style={styles.textErrorStyle}>
          { nameError }
        </Text> : null }

      <Text style={styles.textStyle}>CPF / CNPJ</Text>
      <TextInput 
        style={styles.textInputStyle} 
        textInputStyle="tel"
        value={document}
        keyboardType="number-pad"
        onChangeText={(newText) => {
          setDocument(newText);
        }}
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
      />

      { documentError.length > 0 ?  
        <Text style={styles.textErrorStyle}>
          {documentError}
        </Text> : null }
      

      <Button title="Criar" onPress={() => validate()}/>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 10
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: 'black',
    height: 30,
    margin: 10
  },
  textErrorStyle: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 10,
    color: 'red'
  }
});

export default Form;

