import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { cpf } from 'cpf-cnpj-validator'; 
import { CreateUser } from '../../api/CloudFirestore'
import DocumentInput from './DocumentInput';
import Spinner from './Spinner';

const Form = () => {
  const EMPTY_FIELD_MESSAGE = 'Este campo é obrigatório';

  const [ name, setName ] = useState('');
  const [ nameError, setNameError ] = useState('');
  const [ nameEditable, setNameEditable ] = useState(true);
  
  const [ buttonVisible, setButtonVisible ] = useState(true);

  const [ document, setDocument] = useState('');
  const [ documentError, setDocumentError ] = useState('');
  const [ documentErrorMessage, setDocumentErrorMessage ] = useState('');
  const [ validDocument, setValidDocument] = useState(false);
  const [ documentEditable, setDocumentEditable ] = useState(true);

  const onSubmit = async () => {
    clearErrors();

    if (isInvalidForm()) {
      showErrors();
      return
    }

    setEnableForm(false)
    await CreateUser(name, unmask(document), getType());
    clearForm();
    setEnableForm(true);
  }

  const isInvalidForm = () => {
    return name.length === 0 || document.length === 0 ||
      !validDocument
  }

  const clearForm = () => {
    setName('');
    setDocument('');
    setValidDocument(false);
  }

  const showErrors = () => {
    if (name.length === 0) {
      setNameError(EMPTY_FIELD_MESSAGE);
    }

    if (!validDocument) {
      setDocumentError(documentErrorMessage)
    }
  }

  const clearErrors = () => {
    setNameError('');
    setDocumentError('');
  }

  const setEnableForm = (enable) => {
    setNameEditable(enable)
    setDocumentEditable(enable);
    setButtonVisible(enable)
  }

  const getType = () => {
    if (cpf.isValid(document)) {
      return 'individual'
    } else {
      return 'business'
    }
  }

  const unmask = (text) => {
    text = text.split(".").join("");
	  text = text.split("-").join("");
	  text = text.split("/").join("");
    return text;
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

      <DocumentInput 
        value={document}
        onSetValue={setDocument} 
        onSetValid={setValidDocument} 
        onSetErrorMessage={setDocumentErrorMessage}
        editable={documentEditable}
      />

      { documentError.length > 0 ?  
        <Text style={styles.textErrorStyle}>
          {documentError}
        </Text> : null }
      
      <View style={styles.buttonStyle}>
      { 
        buttonVisible ? 
        <Button 
          title="Criar"
          onPress={() => onSubmit()}
        /> : <Spinner />
      }
      </View>

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
  },
  buttonStyle: {
    marginTop: 20
  }
});

export default Form;