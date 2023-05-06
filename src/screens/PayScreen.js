import React, {useEffect, useState} from 'react';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {SegmentedButtons, DataTable} from 'react-native-paper';
import SelectSimple from '../components/SeletSimple/SelectSimple';
import {SafeAreaView, ScrollView, View} from 'react-native';

export default function PayScreen({navigation}) {
  const [value, setValue] = React.useState('1');
  const onSignUpPressed = async () => {};

  return (
    <SafeAreaView>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: '1',
            label: 'Estado de pagos',
          },
        ]}
      />
      {value === '1' && <VerReservas />}
    </SafeAreaView>
  );
}
const optionsPerPage = [2, 3, 4];

const VerReservas = props => {
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
          <DataTable.Title>Estado</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>DHF564</DataTable.Cell>
          <DataTable.Cell>05/05/2023</DataTable.Cell>
          <DataTable.Cell>Aprobado</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>FER434</DataTable.Cell>
          <DataTable.Cell>05/05/2023</DataTable.Cell>
          <DataTable.Cell>Rechazado</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>FER434</DataTable.Cell>
          <DataTable.Cell>05/05/2023</DataTable.Cell>
          <DataTable.Cell>Pendiente</DataTable.Cell>
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
    <ScrollView>
      <SelectSimple label="Parqueadero" />
      <SelectSimple label="Piso" />
      <SelectSimple label="Celda" />
      <SelectSimple label="Placa" />
      <TextInput label="Fecha inicio" />
      <TextInput label="Hora inicio" />
      <TextInput label="Fecha fin" />
      <TextInput label="Hora fin" />
      <Button
        mode="contained"
        onPress={props.onSignUpPressed}
        style={{marginTop: 24}}>
        Regístrar
      </Button>
    </ScrollView>
  );
};
