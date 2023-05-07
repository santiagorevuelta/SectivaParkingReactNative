import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {TextInput as Input} from 'react-native-paper';
import {theme} from '../core/theme';
import DatePicker from 'react-native-date-picker';
import {padStart} from 'lodash';

export default function TextInput({errorText, description, ...props}) {
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const refInput = useRef();

  return (
    <View style={[styles.container, props.styleContent]}>
      {props?.type ? (
        <Input
          ref={refInput}
          style={[styles.input, props.style]}
          selectionColor={theme.colors.primary}
          underlineColor="transparent"
          mode="outlined"
          onFocus={() => {
            Keyboard.dismiss();
            setModalVisible(true);
          }}
          {...props}
        />
      ) : (
        <Input
          style={[styles.input, props.style]}
          selectionColor={theme.colors.primary}
          underlineColor="transparent"
          mode="outlined"
          {...props}
        />
      )}
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView]}>
            <View style={[styles.containHeader]}>
              <View style={styles.content}>
                <View style={styles.separator} />
                <TouchableOpacity
                  style={[styles.closebtn]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={{color: theme.colors.secondary}}>Aceptar</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <DatePicker
                date={date}
                locale={'es-CO'}
                mode={props?.type}
                onDateChange={date => {
                  setDate(date);
                  if (props?.type === 'date') {
                    const dia = date.getDate();
                    const mes = padStart(date.getMonth() + 1, 2, 0);
                    const anio = date.getFullYear();
                    props.onChangeText(`${dia}/${mes}/${anio}`);
                  } else {
                    const hora = date.getHours();
                    const minut = padStart(date.getMinutes(), 2, 0);
                    props.onChangeText(`${hora}:${minut}`);
                  }
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 5,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.borderColor,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.41)',
  },
  modalView: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containHeader: {
    paddingTop: 15,
    marginBottom: 40,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  content: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    alignContent: 'center',
  },
  filtros: {
    paddingHorizontal: '5%',
  },
  separator: {
    height: 5,
    width: 60,
    marginHorizontal: 50,
    borderWidth: 3,
    marginLeft: '40%',
    borderColor: theme.colors.secondary,
    borderRadius: 10,
  },
  closebtn: {},
});
