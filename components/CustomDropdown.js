import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';

import {Dropdown} from 'react-native-element-dropdown';
const data = [
  {label: 'Afghanistan'},
  {label: 'Angola'},
  {label: 'India'},
  {label: 'Iceland'},
  {label: 'Kyrgyzstan'},
  {label: 'Canada'},
  {label: 'Guinea'},
  {label: 'Ireland'},
];
const CustomDropdown = ({control, name, rules = {}, placeholder, label}) => {
  const [value, setValue] = useState(null);
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
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="label"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={value}
              onChange={onChange}
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

    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 14,
    marginVertical: 5,
  },
  dropdown: {
    height: 40,
  },
  placeholderStyle: {
    fontSize: 18,
  },
  heading: {
    marginTop: 10,

    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 18,
    color: 'black',
  },
});

export default CustomDropdown;
