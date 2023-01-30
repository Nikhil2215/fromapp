import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomInput from '../components/CustomInput';
import CustomPassword from '../components/CustomPassword';
import CustomRadio from '../components/CustomRadio';
import CustomDropdown from '../components/CustomDropdown';
import {useForm, Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../components/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import MultipleDropDown from '../components/CustomCheckBox';

import CheckBox from 'react-native-check-box';

const Form = () => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [formdata, setFormData] = useState({ProfileImage: ''});
  const [imageUri, setImageUri] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setValue('date', currentDate);
  };
  const showDatepicker = () => {
    setShow(true);
  };

  const [hobby, sethobby] = useState(['']);

  const addTextField = () => {
    sethobby([...hobby, '']);
  };
  const [checkboxState, setCheckboxState] = useState({
    Assam: false,
    Uttarakhand: false,
    Punjab: false,
  });
  const onCheckboxChange = name => {
    setCheckboxState({
      ...checkboxState,
      [name]: !checkboxState[name],
    });
    setValue(name, !checkboxState[name]);
  };

  const handleChange = (index, text) => {
    const newTextFields = [...hobby];
    newTextFields[index] = text;
    sethobby(newTextFields);
  };
  const handleRemove = (index, item) => {
    let deletedata = hobby.filter((data, key) => key != index);
    sethobby(deletedata);
  };

  const Submit = data => {
    setFormData(data);
    console.log(formdata);
  };
  const createThreeButtonAlert = () => {
    Alert.alert('Upload profile', 'using', [
      {
        text: 'Open Camera',
        onPress: checkCameraPermission,
      },
      {
        text: 'Open Gallery',
        onPress: checkGalleryPermission,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  function checkCameraPermission() {
    check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    )
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert('This feature is not available on this device');
            break;
          case RESULTS.DENIED:
            request(
              Platform.OS === 'ios'
                ? PERMISSIONS.IOS.CAMERA
                : PERMISSIONS.ANDROID.CAMERA,
            ).then(result => {
              switch (result) {
                case RESULTS.GRANTED:
                  openCamera();
                  break;
              }
            });
            break;
          case RESULTS.GRANTED:
            openCamera();
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  const checkGalleryPermission = () => {
    check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    )
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert('This feature is not available on this device');
            break;
          case RESULTS.DENIED:
            request(
              Platform.OS === 'ios'
                ? PERMISSIONS.IOS.PHOTO_LIBRARY
                : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            ).then(result => {
              switch (result) {
                case RESULTS.GRANTED:
                  openGallery();
                  break;
              }
            });
            break;
          case RESULTS.GRANTED:
            openGallery();
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const openCamera = () => {
    const options = {
      storageoptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchCamera(options, res => {
      if (res.didCancel) {
      } else if (res.errorCode) {
      } else if (res.assets[0].fileSize < 10000000) {
        // setFilePath(res.assets[0]);
        // setPicture({uri: res.assets[0].uri});
        const source = {uri: res.assets[0].uri};
        console.log(source);
        setImageUri(source);
      } else {
        Alert.alert('Image size should be less than 10 MB');
      }
    });
  };

  const openGallery = () => {
    const options = {
      storageoptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, res => {
      if (res.didCancel) {
      } else if (res.errorCode) {
      } else if (res.assets[0].fileSize < 10000000) {
        // setFilePath(res.assets[0]);
        // setPicture({uri: res.assets[0].uri});
        const source = {uri: res.assets[0].uri};
        console.log(source);
        setImageUri(source);
        setFormData;
      } else {
        Alert.alert('Image size should be less than 10 MB');
      }
    });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      bounces={false}>
      <SafeAreaView>
        <View style={{padding: 20}}>
          {imageUri === '' ? (
            <View
              style={{
                backgroundColor: '#d4cbcf',
                height: 100,
                width: 100,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <Icon name="person-add-outline" size={40} color={'grey'} />
            </View>
          ) : (
            <View style={{marginBottom: 10}}>
              <Image
                source={imageUri}
                style={{height: 100, width: 100, borderRadius: 50}}
              />
            </View>
          )}

          <Button
            title="upload"
            onPress={() => {
              createThreeButtonAlert();
            }}
          />

          <CustomInput
            label={'Name'}
            name="name"
            control={control}
            placeholder="Enter name"
            rules={{
              required: 'Name is required',
            }}
          />
          <CustomPassword
            label={'Password'}
            name="password"
            control={control}
            placeholder="Enter password"
            secureTextEntry
            rules={{
              required: 'Password is required',
            }}
          />
          <CustomInput
            label={'Email'}
            name="email"
            control={control}
            placeholder="Enter email"
            rules={{
              required: 'Email is required',
            }}
          />
          <CustomInput
            label={'Phone number'}
            name="Phone"
            control={control}
            keyboardType="numeric"
            placeholder="Enter your number"
            rules={{
              required: 'Phone number is required',
            }}
          />

          <CustomInput
            label={"Father's name"}
            name="FatherName"
            control={control}
            placeholder="Enter your Father's name"
          />
          <CustomRadio
            control={control}
            label={'Gender'}
            name="gender"
            rules={{
              required: 'Gender is required',
            }}
          />
          <CustomDropdown
            control={control}
            label={'Select Country'}
            placeholder={'Select country'}
            name="country"
            rules={{
              required: 'Conuntry is required',
            }}
          />

          <Text style={styles.heading}>Preferred State</Text>
          <View style={styles.checkbox}>
            <CheckBox
              style={{flex: 1, padding: 10}}
              onClick={() => onCheckboxChange('Assam')}
              isChecked={checkboxState.Assam}
              leftText={'Assam'}
              leftTextStyle={{fontSize: 18}}
              //checkedImage={require('./components/image/checked.png')}
              //unCheckedImage={require('./components/image/unchecked.png')}
            />
            <CheckBox
              style={{flex: 1, padding: 10}}
              onClick={() => onCheckboxChange('Uttarakhand')}
              isChecked={checkboxState.Uttarakhand}
              leftText={'Uttarakhand'}
              leftTextStyle={{fontSize: 18}}
              //checkedImage={require('/components/image/checked.png')}
              //unCheckedImage={require('./components/image/unchecked.png')}
            />
            <CheckBox
              style={{flex: 1, padding: 10}}
              onClick={() => onCheckboxChange('Punjab')}
              isChecked={checkboxState.Punjab}
              leftText={'Punjab'}
              leftTextStyle={{fontSize: 18}}
              //checkedImage={require('/components/image/checked.png')}
              //unCheckedImage={require('./components/image/unchecked.png')}
            />
          </View>

          <Controller
            control={control}
            name="date"
            render={({field: {value, onBlur}, fieldState: {error}}) => (
              <>
                <Text style={styles.heading1}>Date</Text>
                <TouchableOpacity
                  style={styles.calendarView}
                  onPress={showDatepicker}>
                  <View style={styles.container1}>
                    <Text style={styles.input}>
                      {date.toLocaleDateString()}
                    </Text>

                    <Icon
                      name="calendar-outline"
                      size={30}
                      color={'grey'}
                      style={styles.passwordIcon}
                    />
                  </View>

                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode="date"
                      placeholderText="Select date"
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                    />
                  )}
                </TouchableOpacity>
              </>
            )}
          />
          <Text style={styles.heading}>Hobbies</Text>
          <View style={styles.addView}>
            {hobby.map((text, index) => (
              <View style={styles.removeView}>
                <TextInput
                  style={styles.addInput}
                  key={index}
                  value={text}
                  onChangeText={text => handleChange(index, text)}
                />
                {text === '' ? null : (
                  <Button
                    title="Remove"
                    style={styles.removebutton}
                    onPress={() => handleRemove(index, text)}
                  />
                )}
              </View>
            ))}

            <Button title="Add" onPress={addTextField} />
          </View>
          <MultipleDropDown
            control={control}
            name="select"
            label={'Select item'}
          />

          <CustomButton text="Submit" onPress={handleSubmit(Submit)} />
          <Text>Form Data: {JSON.stringify({formdata, hobby})}</Text>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Form;

const styles = StyleSheet.create({
  container1: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  heading1: {
    marginTop: 10,

    fontSize: 18,
  },
  passwordIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  addView: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  addInput: {
    backgroundColor: 'white',
    width: '80%',
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  heading: {
    marginTop: 10,
    fontSize: 18,
  },
  removeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileiconStyle: {
    borderRadius: 50,
    height: 100,
    width: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  checkbox: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
