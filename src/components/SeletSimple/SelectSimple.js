import React, {useEffect, useState} from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import SelectList from './SelectList';
import {Picker} from '@react-native-picker/picker';
import {theme} from '../../core/theme';

const Selector = ({
  style = null,
  styleContent = {},
  label,
  name,
  set = false,
  title = '',
  onPress,
  placeholder = 'Seleccionar...',
  valueSelected = [],
  list = [],
  search,
  id_label = 'key',
  value_label = 'value',
  styleList = null,
  returnPress = false,
  multiple = false,
}) => {
  const [value, setValue] = useState(valueSelected);
  const [modalView, setModalView] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    if (!initial) {
      if (set) {
        onPress(value[0]);
      } else {
        onPress(value || []);
      }
    }
    setInitial(false);
  }, [value]);

  useEffect(() => {
    if (set) {
      valueSelected = [valueSelected];
    }

    if (
      valueSelected.length > 0 &&
      valueSelected[0] !== '' &&
      valueSelected[0] !== '-1'
    ) {
      if (list.length > 0) {
        try {
          let nameVal = list.filter(fl => {
            return fl[id_label] === valueSelected[0];
          });
          if (nameVal.length > 0) {
            setNameValue(nameVal[0][value_label]);
          } else {
            setNameValue('');
          }
        } catch (e) {
          console.log('error en el Selector', e);
        }
      }
    } else {
      setNameValue('');
    }
  }, [valueSelected]);

  return (
    <View style={[styles.container, styleContent]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={style ? [styles.selector, style] : styles.selector}
        onPress={() => {
          if (returnPress) {
            onPress();
          } else {
            setModalView(true);
          }
        }}>
        {nameValue !== '' ? (
          <Text style={[styles.placeholder, styles.value]}>{nameValue}</Text>
        ) : (
          <Text style={styles.placeholder} numberOfLines={1}>
            {placeholder}
          </Text>
        )}
        {Platform.OS === 'ios' && (
          <Image
            source={require('../../assets/selector.png')}
            style={{
              width: 10,
              height: 15,
              resizeMode: 'contain',
              tintColor: theme.colors.primary,
            }}
          />
        )}
      </TouchableOpacity>
      {Platform.OS === 'ios' ? (
        <SelectList
          list={list}
          styleList={styleList}
          name={name}
          search={search}
          title={title}
          id_label={id_label}
          value_label={value_label}
          value={value}
          multiple={multiple}
          setValue={setValue}
          placeholder={placeholder}
          setModalView={setModalView}
          modalView={modalView}
          typeModal={true}
        />
      ) : (
        <Picker
          style={styles.piker}
          selectedValue={value[0]}
          dropdownIconColor={theme.colors.primary}
          dropdownIconRippleColor={'transparent'}
          onValueChange={(itemValue, itemIndex) => {
            setValue([itemValue]);
            if (Platform.OS === 'android') {
              setModalView(!modalView);
            }
          }}>
          <Picker.Item key={'-1'} label={'Selecciona...'} value={''} />
          {list?.map((item, i) => (
            <Picker.Item
              key={i}
              label={item[value_label]}
              value={item[id_label]}
            />
          ))}
        </Picker>
      )}
    </View>
  );
};

export default Selector;
