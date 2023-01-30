import MultipleSelect from 'react-native-multiple-select';
import {useForm, Controller} from 'react-hook-form';
import {Text, StyleSheet} from 'react-native';
const items = [
  {
    id: '92iijs7yta',
    name: 'Ondo',
  },
  {
    id: 'a0s0a8ssbsd',
    name: 'Ogun',
  },
  {
    id: '16hbajsabsd',
    name: 'Calabar',
  },
  {
    id: 'nahs75a5sg',
    name: 'Lagos',
  },
  {
    id: '667atsas',
    name: 'Maiduguri',
  },
  {
    id: 'hsyasajs',
    name: 'Anambra',
  },
  {
    id: 'djsjudksjd',
    name: 'Benue',
  },
  {
    id: 'sdhyaysdj',
    name: 'Kaduna',
  },
  {
    id: 'suudydjsjd',
    name: 'Abuja',
  },
];
const MultipleDropDown = ({control, name, label}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {value, onChange}}) => (
        <>
          <Text style={styles.heading}>{label}</Text>
          <MultipleSelect
            items={items}
            uniqueKey="name"
            searchInputPlaceholderText="Search Items..."
            onSelectedItemsChange={selectedItems => onChange(selectedItems)}
            selectedItems={value}
            styleTextDropdown={{fontSize: 15}}
            styleSelectorContainer={{marginHorizontal: 20}}
            searchInputStyle={{height: 40}}
            styleItemsContainer={{marginHorizontal: 20}}
            tagContainerStyle={{marginHorizontal: 20}}
            styleDropdownMenu={styles.container}
          />
        </>
      )}
    />
  );
};
export default MultipleDropDown;
const styles = StyleSheet.create({
  heading: {
    marginTop: 10,

    fontSize: 18,
  },
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 14,
    marginVertical: 5,
  },
});
