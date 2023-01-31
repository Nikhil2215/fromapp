import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useForm} from 'react-hook-form';
import Slider from '@react-native-community/slider';

const CustomSlider = () => {
  const [value, setValues] = useState(0);
  const {register, setValue, errors} = useForm();

  return (
    <View>
      <Slider
        value={value}
        onValueChange={setValues}
        minimumValue={0}
        maximumValue={100}
        step={1}
      />
      <Text>Value: {value}</Text>
    </View>
  );
};

export default CustomSlider;
