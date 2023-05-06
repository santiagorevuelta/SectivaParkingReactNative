import React, {useEffect, useState} from 'react';
import {
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import {theme} from '../../core/theme';

const SelectList = ({
  list,
  typeModal = false,
  modalView,
  setModalView,
  value,
  placeholder,
  title = '',
  multiple,
  id_label,
  value_label,
  styleList,
  setValue,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [lista, setLista] = useState(list);

  useEffect(() => {
    setLista(list);
  }, [list]);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={!typeModal ? modalVisible : modalView}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, styleList]}>
            <View
              style={[
                styles.containHeader,
                title === '' ? {marginBottom: 10} : {},
              ]}>
              <View style={styles.content}>
                <View style={styles.separator} />
                <TouchableOpacity
                  style={[
                    styles.closebtn,
                    !multiple && {
                      right: '-250%',
                    },
                  ]}
                  onPress={() => {
                    setModalView(!modalView);
                  }}>
                  <Text style={{color: theme.colors.secondary}}>Aceptar</Text>
                </TouchableOpacity>
              </View>
            </View>
            {(title !== '' || placeholder !== 'Seleccionar...') && (
              <Text
                style={{
                  marginHorizontal: 20,
                  color: '#000',
                  textAlign: 'center',
                  fontSize: 15,
                  marginBottom: title || placeholder ? 0 : 10,
                }}>
                {title || placeholder}
              </Text>
            )}
            <Picker
              selectedValue={value[0]}
              onValueChange={(itemValue, itemIndex) => {
                setValue([itemValue]);
                if (Platform.OS === 'android') {
                  setModalView(!modalView);
                }
              }}>
              <Picker.Item
                key={'-1'}
                label={'Seleccionar...'}
                value={''}
                color={theme.colors.onSurface}
              />
              {lista?.map((item, i) => (
                <Picker.Item
                  key={i}
                  label={item[value_label]}
                  value={item[id_label]}
                  color={theme.colors.onSurface}
                />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SelectList;
