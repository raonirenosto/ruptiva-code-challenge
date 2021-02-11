import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet,  } from 'react-native';
import { cpf, cnpj } from 'cpf-cnpj-validator';

const Form = ({value, onSetValue, onSetValid, onSetErrorMessage, editable}) => {
  const EMPTY_FIELD_MESSAGE = 'Este campo é obrigatório';
  const INVALID_DOCUMENT_MESSAGE = 'CPF ou CNPJ inválido'

  const setDocumentErrors = (text) => {
    if (text.length === 0) {
      onSetErrorMessage(EMPTY_FIELD_MESSAGE);
    } else {
      if (!isCpfOrCnpj(text)) {
        onSetErrorMessage(INVALID_DOCUMENT_MESSAGE);
      }
    }
  }

  useEffect(() => {
    validate(value);
  }, []);

  const isCpfOrCnpj = (text) => {
    return (cpf.isValid(text) || cnpj.isValid(text));
  }

  const onFocus = () => {
    onSetValue(unmask(value));
  }

  const onBlur = () => {
    onSetValue(mask(value));
  }

  const validate = (newText) => {
    const valid = isCpfOrCnpj(newText)
    onSetValid(valid);

    if (!valid) {
      setDocumentErrors(newText);
    } 
  }

  const onChangeText = (newText) => {
    onSetValue(newText)
    validate(newText)
  }

  const mask = (text) => {
    if (cnpj.isValid(text)) {
      return cnpj.format(text)
    }
    if (cpf.isValid(text)) {
      return cpf.format(text)
    }
    return text
  }

  const unmask = (text) => {
    console.log(text)
    text = text.split(".").join("");
	  text = text.split("-").join("");
	  text = text.split("/").join("");
    console.log(text)
    return text;
  }

  return (
    <View>
      <Text style={styles.textStyle}>CPF / CNPJ</Text>
      <TextInput 
        style={styles.textInputStyle} 
        textInputStyle="tel"
        value={value}
        keyboardType="number-pad"
        editable={editable}
        onChangeText={(newText) => onChangeText(newText)}
        onFocus={() => onFocus()}
        onBlur={() => onBlur()} 
      />
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
  }
});

export default Form;