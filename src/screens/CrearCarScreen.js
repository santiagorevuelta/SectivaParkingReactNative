import React, {useEffect, useState} from 'react';
import Background from '../components/Background';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {SegmentedButtons, DataTable} from 'react-native-paper';
import SelectSimple from '../components/SeletSimple/SelectSimple';
import {SafeAreaView, View, Dimensions} from 'react-native';

export default function CrearCarScreen({navigation}) {
  const [value, setValue] = React.useState('');
  const onSignUpPressed = async () => {};
  const {width} = Dimensions.get('window');

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
        {value === '1' && <VerVehiculos />}
        {value === '2' && <Registrar />}
      </SafeAreaView>
    </Background>
  );
}
const optionsPerPage = [2, 3, 4];

const VerVehiculos = props => {
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

        <DataTable.Row>
          <DataTable.Cell>DHF564</DataTable.Cell>
          <DataTable.Cell>Renault</DataTable.Cell>
          <DataTable.Cell numeric>2022</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>FER434</DataTable.Cell>
          <DataTable.Cell>Mazda</DataTable.Cell>
          <DataTable.Cell numeric>2023</DataTable.Cell>
        </DataTable.Row>

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

const Registrar = props => {
  return (
    <>
      <SelectSimple label="Tipo vehiculo" />
      <SelectSimple label="Marca" />
      <TextInput label="Placa" returnKeyType="next" />
      <TextInput label="Modelo" returnKeyType="next" />
      <TextInput label="Color" returnKeyType="next" />
      <Button
        mode="contained"
        onPress={props.onSignUpPressed}
        style={{marginTop: 24}}>
        Regístrar
      </Button>
    </>
  );
};
