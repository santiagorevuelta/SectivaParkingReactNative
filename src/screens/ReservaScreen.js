import React, {useEffect, useState} from 'react';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {SegmentedButtons, DataTable, Snackbar} from 'react-native-paper';
import SelectSimple from '../components/SeletSimple/SelectSimple';
import {Dimensions, SafeAreaView, ScrollView, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../core/theme';
import Background from '../components/Background';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReservaScreen({navigation}) {
  const [table, setTable] = useState([]);
  const [value, setValue] = React.useState('');
  const {width} = Dimensions.get('window');

  useEffect(() => {
    async function init() {
      let table_data = (await AsyncStorage.getItem('reservas')) || '[]';
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
              label: 'Mis reservas',
            },
            {
              value: '2',
              label: 'Registrar',
            },
          ]}
        />
        {value === '1' && <VerReservas table={table} />}
        {value === '2' && (
          <Registrar table={table} setTable={setTable} setValue={setValue} />
        )}
      </SafeAreaView>
    </Background>
  );
}
const optionsPerPage = [1];

const VerReservas = ({table}) => {
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
          <DataTable.Title>Fecha inicio</DataTable.Title>
          <DataTable.Title>Fecha fin</DataTable.Title>
          <DataTable.Title numeric>Pagar</DataTable.Title>
        </DataTable.Header>
        {table.map((item, i) => (
          <DataTable.Row key={i}>
            <DataTable.Cell>{item.placa}</DataTable.Cell>
            <DataTable.Cell>{item.fechaIni}</DataTable.Cell>
            <DataTable.Cell>{item.fechaFin}</DataTable.Cell>
            <DataTable.Cell numeric>
              <MaterialIcons
                name={'payment'}
                size={22}
                color={theme.colors.primary}
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={table.length}
          onPageChange={page => setPage(page)}
          label={`1-2 of ${table.length}`}
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
  const [placa, setPlaca] = useState('');
  const [piso, setPiso] = useState('');
  const [celda, setCelda] = useState('');
  const [parquedero, setParquedero] = useState('');
  const [fechaIni, setFechaIni] = useState('');
  const [horaIni, setHoraIni] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [horaFin, setHoraFin] = useState('');

  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const [listas, setListas] = useState({
    parqueadero: [
      {key: '1', value: '01'},
      {key: '2', value: '02'},
    ],
    piso: [
      {key: '1', value: '01'},
      {key: '2', value: '02'},
    ],
    celda: [
      {key: '1', value: '01'},
      {key: '2', value: '02'},
    ],
    placa: [
      {key: '1', value: 'FJE124'},
      {key: '2', value: 'UEG453'},
      {key: '3', value: 'OHO444'},
    ],
  });

  const onSendPressed = async () => {
    let id = listas.placa.filter(e => {
      return e.key === placa;
    })[0];
    let newReg = [
      ...table,
      {placa: id.value, fechaIni, horaIni, fechaFin, horaFin},
    ];
    setTable(newReg);
    setValue('1');
    await AsyncStorage.setItem('reservas', JSON.stringify(newReg));
  };

  return (
    <ScrollView style={{marginBottom: 20}}>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        Registrado correctamente
      </Snackbar>
      <SelectSimple
        list={listas.parqueadero}
        set={true}
        label="Parqueadero"
        valueSelected={parquedero}
        onPress={value => {
          setParquedero(value);
        }}
      />
      <SelectSimple
        list={listas.piso}
        set={true}
        label="Piso"
        valueSelected={piso}
        onPress={value => {
          setPiso(value);
        }}
      />
      <SelectSimple
        list={listas.celda}
        set={true}
        label="Celda"
        valueSelected={celda}
        onPress={value => {
          setCelda(value);
        }}
      />
      <SelectSimple
        list={listas.placa}
        set={true}
        valueSelected={placa}
        onPress={value => {
          setPlaca(value);
        }}
        label="Placa"
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <TextInput
          type={'date'}
          styleContent={{width: '50%'}}
          style={{width: '90%'}}
          label="Fecha inicio"
          value={fechaIni}
          onChangeText={e => {
            setFechaIni(e);
          }}
        />
        <TextInput
          type={'time'}
          styleContent={{width: '50%'}}
          style={{width: '100%'}}
          label="Hora inicio"
          value={horaIni}
          onChangeText={e => {
            setHoraIni(e);
          }}
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <TextInput
          type={'date'}
          styleContent={{width: '50%'}}
          style={{width: '90%'}}
          label="Fecha fin"
          value={fechaFin}
          onChangeText={e => {
            setFechaFin(e);
          }}
        />
        <TextInput
          type={'time'}
          styleContent={{width: '50%'}}
          style={{width: '100%'}}
          label="Hora fin"
          value={horaFin}
          onChangeText={e => {
            setHoraFin(e);
          }}
        />
      </View>
      <Button mode="contained" onPress={onSendPressed} style={{marginTop: 24}}>
        Regístrar
      </Button>
    </ScrollView>
  );
};
