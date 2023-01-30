import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';

import RadioButtonRN from 'radio-buttons-react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Layout} from 'react-native-reanimated';
const data = [
  {
    label: 'Male',
  },
  {
    label: 'Female',
  },
];

const CustomRadio = ({control, name, rules = {}, label}) => {
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
            <RadioButtonRN
              boxStyle={styles.box}
              style={styles.radio}
              textStyle={styles.text}
              data={data}
              value={value}
              selectedBtn={onChange}
              icon={
                <Icon
                  name="radio-button-on-outline"
                  size={25}
                  color="#2c9dd1"
                />
              }
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
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    height: 60,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  radio: {
    flex: 1,
    //backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 18,
  },
  heading: {
    marginTop: 10,
    fontSize: 18,
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    height: 40,
    width: 200,
  },
  text: {
    fontSize: 18,
    height: 40,
    top: 11,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomRadio;
