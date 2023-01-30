import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  label,
  key,
  keyboardType,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <Text style={styles.heading}>{label}</Text>
          <View
            style={[styles.container, {borderColor: error ? 'red' : 'black'}]}>
            <TextInput
              value={value}
              key={key}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text
              style={{
                color: 'red',
                alignSelf: 'stretch',
              }}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  input: {
    //backgroundColor: 'red',
    fontSize: 18,
    height: 60,
  },
  heading: {
    marginTop: 10,

    fontSize: 18,
  },
});

export default CustomInput;
