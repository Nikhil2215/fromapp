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
  FlatList,
  LogBox,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomInput from '../components/CustomInput';
import CustomPassword from '../components/CustomPassword';
import ImagePicker from 'react-native-image-crop-picker';
import CustomRadio from '../components/CustomRadio';
import CustomDropdown from '../components/CustomDropdown';
import {useForm, Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../components/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import MultipleDropDown from '../components/multiple';
import CustomSwitch from '../components/Customswitch';
import CustomSlider from '../components/CustomSlider';
import Addto from '../components/addto';

import CheckBox from 'react-native-check-box';
import {object} from 'prop-types';

const Form = () => {
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();
  const pwd = watch('password');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [formdata, setFormData] = useState({
    ProfileImage: '',
    hobby: [{name: '', Isadded: false}],
    language: [{name: '', Isadded: false}],
  });
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
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

  const addTextField = index => {
    let temp = formdata.hobby;
    temp[index].Isadded = true;
    temp.push({name: '', Isadded: false});
    setFormData(Object.assign({}, formdata, {hobby: temp}));
    console.log(formdata);
  };

  const handleChange = (index, text) => {
    let temp = formdata.hobby;
    temp[index].name = text;
    setFormData(Object.assign({}, formdata, {hobby: temp}));
    console.log(temp);
  };
  const handleRemove = (index, item) => {
    let temp = formdata.hobby;
    let deletedata = temp.filter((data, key) => key != index);
    setFormData(Object.assign({}, formdata, {hobby: deletedata}));
  };
  const addTextField1 = index => {
    let temp = formdata.language;
    temp[index].Isadded = true;
    temp.push({name: '', Isadded: false});
    setFormData(Object.assign({}, formdata, {language: temp}));
    console.log(formdata);
  };

  const handleChange1 = (index, text) => {
    let temp = formdata.language;
    temp[index].name = text;
    setFormData(Object.assign({}, formdata, {language: temp}));
    console.log(temp);
  };
  const handleRemove1 = (index, item) => {
    let temp = formdata.language;
    let deletedata = temp.filter((data, key) => key != index);
    setFormData(Object.assign({}, formdata, {language: deletedata}));
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
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      let source = {uri: image.path};
      setFormData(Object.assign({}, formdata, {ProfileImage: source}));
    });
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      let source = {uri: image.path};
      setFormData(Object.assign({}, formdata, {ProfileImage: source}));
    });
  };

  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const PASS_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  const NAME_REGEX = /^[a-zA-Z ]*$/;

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      bounces={false}>
      <SafeAreaView>
        <View style={{padding: 20}}>
          {formdata.ProfileImage === '' ? (
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
                source={formdata.ProfileImage}
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
              minLength: {
                value: 3,
                message: 'Password should be at least 3 characters long',
              },
              pattern: {value: NAME_REGEX, message: 'Email is invalid'},
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
              minLength: {
                value: 8,
                message: 'Password should be at least 8 characters long',
              },
              pattern: {
                value: PASS_REGEX,
                message:
                  'A password must contain characters, numbers and one special character (@, $, !, &, etc).',
              },
            }}
          />
          <CustomPassword
            name="password-repeat"
            control={control}
            label={'Repeat Password'}
            placeholder="Repeat Password"
            secureTextEntry
            rules={{
              validate: value => value === pwd || 'Password do not match',
            }}
          />
          <CustomInput
            label={'Email'}
            name="email"
            control={control}
            placeholder="Enter email"
            rules={{
              required: 'Email is required',
              pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
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
            label={'Landline number'}
            name="landline"
            control={control}
            keyboardType="numeric"
            placeholder="Enter your number"
            rules={{
              required: 'Landline number is required',
            }}
          />
          <CustomInput
            label={'Zip code'}
            name="Zipcode"
            control={control}
            keyboardType="numeric"
            placeholder="Enter Zip code"
            rules={{
              required: 'Zip code is required',
            }}
          />
          <CustomInput
            label={'Height in cm'}
            name="height"
            control={control}
            keyboardType="numeric"
            placeholder="Enter your height"
            rules={{
              required: 'Height is required',
            }}
          />
          <CustomInput
            label={'Weight in kg'}
            name="weight"
            control={control}
            keyboardType="numeric"
            placeholder="Enter your weight"
            rules={{
              required: 'Weight is required',
            }}
          />
          <CustomInput
            label={'Address'}
            name="Address"
            control={control}
            placeholder="Enter your address"
            rules={{
              required: 'Address is required',
            }}
          />

          <CustomInput
            label={"Father's name"}
            name="FatherName"
            control={control}
            placeholder="Enter your Father's name"
          />
          <CustomInput
            label={"Mother's name"}
            name="MotherName"
            control={control}
            placeholder="Enter your mother's name"
          />
          <CustomInput
            label={'Job title'}
            name="job_title"
            control={control}
            placeholder="Enter your job title"
            rules={{
              required: 'Job title is required',
            }}
          />

          <CustomInput
            label={'Company'}
            name="Company"
            control={control}
            placeholder="Enter your company"
            rules={{
              required: 'company name is required',
            }}
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
            <FlatList
              data={formdata.hobby}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.removeView}>
                    <TextInput
                      style={styles.addInput}
                      key={index}
                      value={item.name}
                      onChangeText={item => handleChange(index, item)}
                    />
                    {item.Isadded === true ? (
                      <Button
                        title="Remove"
                        style={styles.removebutton}
                        onPress={() => handleRemove(index, item)}
                      />
                    ) : (
                      <Button title="Add" onPress={() => addTextField(index)} />
                    )}
                  </View>
                );
              }}
            />
          </View>
          <Text style={styles.heading}>Language</Text>
          <View style={styles.addView}>
            <FlatList
              data={formdata.language}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.removeView}>
                    <TextInput
                      style={styles.addInput}
                      key={index}
                      value={item.name}
                      onChangeText={item => handleChange1(index, item)}
                    />
                    {item.Isadded === true ? (
                      <Button
                        title="Remove"
                        style={styles.removebutton}
                        onPress={() => handleRemove1(index, item)}
                      />
                    ) : (
                      <Button
                        title="Add"
                        onPress={() => addTextField1(index)}
                      />
                    )}
                  </View>
                );
              }}
            />
          </View>

          <MultipleDropDown
            control={control}
            name="select"
            label={'Select item'}
            rules={{
              required: 'This field required',
            }}
          />
          <CustomSwitch />
          <CustomSlider />

          <CustomButton text="Submit" onPress={handleSubmit(Submit)} />
          {formdata ? (
            <Text>Form Data: {JSON.stringify({formdata})}</Text>
          ) : null}
          {/* <Text>Form Data: {JSON.stringify({formdata})}</Text> */}
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
