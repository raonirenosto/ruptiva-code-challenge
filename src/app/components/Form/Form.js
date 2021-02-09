import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { cpf, cnpj } from 'cpf-cnpj-validator'; 
import { CreateUser } from '../../../api/CloudFirestore'

const Form = () => {
  const [ name, setName ] = useState('');
  const [ document, setDocument] = useState('');
  const [ nameError, setNameError ] = useState('');
  const [ documentError, setDocumentError ] = useState('');
  const [ nameEditable, setNameEditable ] = useState(true);
  const [ documentEditable, setDocumentEditable ] = useState(true);
  const [ buttonVisible, setButtonVisible ] = useState(true);
  const EMPTY_FIELD_MESSAGE = 'Este campo é obrigatório';
  const INVALID_DOCUMENT_MESSAGE = 'CPF ou CNPJ inválido'

  const onSubmit = async () => {
    clearErrors();

    if (isInvalidForm()) {
      showErrors();
      return
    }

    console.log("ok, formulário está validado")

    showSpinner();
    await CreateUser(name, unmask(document), getType());
    clearForm();
    hideSpinner();
  }

  const isInvalidForm = () => {
    return name.length === 0 || document.length === 0 ||
        !isCpfOrCnpj()
  }

  const clearForm = () => {
    setName('');
    setDocument('');
  }

  const showErrors = () => {
    if (name.length === 0) {
      setNameError(EMPTY_FIELD_MESSAGE);
    }

    showDocumentErrors();
  }

  const showDocumentErrors = () => {
    if (document.length === 0) {
      setDocumentError(EMPTY_FIELD_MESSAGE);
    } else {
      if (!isCpfOrCnpj()) {
        setDocumentError(INVALID_DOCUMENT_MESSAGE);
      }
    }
  }

  const clearErrors = () => {
    setNameError('');
    setDocumentError('');
  }

  const showSpinner = () => {
    setNameEditable(false)
    setDocumentEditable(false);
    setButtonVisible(false)
  }

  const hideSpinner = () => {
    setNameEditable(true)
    setDocumentEditable(true);
    setButtonVisible(true)
  }

  const getType = () => {
    if (cpf.isValid(document)) {
      return 'individual'
    } else {
      return 'business'
    }
  }

  const isCpfOrCnpj = () => {
    return (cpf.isValid(document) || cnpj.isValid(document));
  }

  const onFocus = () => {
    setDocument(unmask(document));
  }

  const onBlur = () => {
    if (cnpj.isValid(document)) {
      setDocument(cnpj.format(document))
    }
    if (cpf.isValid(document)) {
      setDocument(cpf.format(document))
    }
    setDocumentError('')
    showDocumentErrors();
  }

  const unmask = (value) => {
    value = value.split(".").join("");
	  value = value.split("-").join("");
	  value = value.split("/").join("");
    return value;
  }

  const spinner = () => {
    return <View style={{ flexDirection: 'row'}}>
      <ActivityIndicator size="small" color="#0000ff" />
      <Text style={{fontSize: 16}}>Enviando</Text>
    </View>
  }

  return (
    <View>
      <Text style={styles.textStyle}>Nome / Razão Social</Text>
      <TextInput 
        autoFocus={true}
        autoCorrect={false}
        style={styles.textInputStyle}
        value={name}
        editable={nameEditable}
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
        editable={documentEditable}
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

      { 
        buttonVisible ? 
        <Button 
          title="Criar"
          onPress={() => onSubmit()}
        /> : spinner()
      }

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