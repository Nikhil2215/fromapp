import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

const Addto = ({control, name, rules}) => {
  const addInput = () => {
    setInputs([...inputs, {key: inputs.length}]);
  };

  const removeInput = index => {
    setInputs(inputs.filter((input, i) => i !== index));
  };

  return (
    <View>
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({onChange, onBlur, value}) => (
          <TextInput
            style={{
              height: 40,
              width: 200,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        // name={`input-${index}`}
        // rules={{required: true}}
        // defaultValue=""
      />
      <Button title="-" onPress={() => removeInput(index)} />

      <Button title="Add" onPress={addInput} />
    </View>
  );
};

export default Addto;
