import React, {useEffect, useState} from 'react';
import Background from '../components/Background';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {SegmentedButtons, DataTable} from 'react-native-paper';
import SelectSimple from '../components/SeletSimple/SelectSimple';
import {SafeAreaView, View, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../core/theme';

export default function CrearCarScreen({navigation}) {
  const [value, setValue] = React.useState('1');
  const {width} = Dimensions.get('window');
  const [table, setTable] = useState([]);

  useEffect(() => {
    async function init() {
      let table_data = (await AsyncStorage.getItem('vehiculos')) || '[]';
      table_data = JSON.parse(table_data);
      setTable(table_data);
    }
    init().then();
  }, [table]);

  return (
    <Background>
      <SafeAreaView style={{width: width - 40}}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: '1',
              label: 'Mis Vehiculos',
            },
            {
              value: '2',
              label: 'Registrar',
            },
          ]}
        />
        {value === '1' && <VerVehiculos table={table} />}
        {value === '2' && (
          <Registrar table={table} setTable={setTable} setValue={setValue} />
        )}
      </SafeAreaView>
    </Background>
  );
}
const optionsPerPage = [2, 3, 4];

const VerVehiculos = ({table}) => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Placa</DataTable.Title>
          <DataTable.Title>Marca</DataTable.Title>
          <DataTable.Title numeric>Modelo</DataTable.Title>
        </DataTable.Header>
        {table.map((item, i) => (
          <DataTable.Row key={i}>
            <DataTable.Cell>{item.placa}</DataTable.Cell>
            <DataTable.Cell>{item.marca}</DataTable.Cell>
            <DataTable.Cell numeric>{item.modelo}</DataTable.Cell>
          </DataTable.Row>
        ))}
        <DataTable.Pagination
          page={page}
          numberOfPages={3}
          onPageChange={page => setPage(page)}
          label="1-2 of 6"
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          optionsLabel={'Rows per page'}
        />
      </DataTable>
    </>
  );
};

const Registrar = ({table, setTable, setValue}) => {
  const [tipo, setTipo] = useState('');
  const [marca, setMarca] = useState('');
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [color, setColor] = useState('');

  const [listas] = useState({
    marca: [
      {key: '1', value: 'BMW'},
      {key: '2', value: 'Mercedes-Benz'},
      {key: '3', value: 'Audi'},
      {key: '4', value: 'Lexus'},
      {key: '5', value: 'Renault'},
      {key: '6', value: 'Ford'},
    ],
    tipo: [
      {key: '1', value: 'SUV'},
      {key: '2', value: 'Personal'},
      {key: '3', value: 'Familiar'},
    ],
  });

  const onSendPressed = async () => {
    let _tipo = listas.tipo.filter(e => {
      return e.key === tipo;
    })[0];
    let _marca = listas.marca.filter(e => {
      return e.key === marca;
    })[0];
    let newReg = [
      ...table,
      {
        key: table.length,
        placa: placa,
        modelo,
        color,
        tipo: _tipo.value,
        marca: _marca.value,
      },
    ];
    setTable(newReg);
    setValue('1');
    await AsyncStorage.setItem('vehiculos', JSON.stringify(newReg));
  };

  return (
    <>
      <SelectSimple
        list={listas.tipo}
        label="Tipo vehiculo"
        set={true}
        valueSelected={tipo}
        onPress={value => {
          setTipo(value);
        }}
      />
      <SelectSimple
        list={listas.marca}
        label="Marca (obligatorio)"
        valueSelected={marca}
        set={true}
        onPress={value => {
          setMarca(value);
        }}
      />
      <TextInput
        label="Placa (obligatorio)"
        returnKeyType="next"
        value={placa}
        onChangeText={e => {
          let texto = e.toUpperCase();
          if (texto.length <= 6) {
            setPlaca(e.toUpperCase());
          }
        }}
      />
      <TextInput
        label="Modelo (obligatorio)"
        returnKeyType="next"
        value={modelo}
        onChangeText={e => {
          setModelo(e);
        }}
      />
      <TextInput
        label="Color"
        returnKeyType="next"
        value={color}
        onChangeText={e => {
          setColor(e);
        }}
      />
      {tipo !== '' && modelo !== '' && marca !== '' && placa !== '' && (
        <Button
          mode="contained"
          onPress={onSendPressed}
          disabled={placa === ''}
          style={{marginTop: 24}}>
          Regístrar
        </Button>
      )}
    </>
  );
};
