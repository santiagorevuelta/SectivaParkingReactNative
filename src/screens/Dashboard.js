import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import CrearCarScreen from './CrearCarScreen';
import ReservaScreen from './ReservaScreen';
import PayScreen from './PayScreen';
import {WebView} from 'react-native-webview';

const CuentaRoute = () => (
  <SafeAreaView>
    <Text>Notifications</Text>
  </SafeAreaView>
);

const HomeRoute = () => (
  <SafeAreaView>
    <Text style={{textAlign: 'center'}}>Encuentra tu parqueadero</Text>
    <View style={{width: '100%', height: '90%'}}>
      <WebView
        source={{
          uri: 'https://www.google.com/maps/@6.279967,-75.5858882,15z',
        }}
        style={{marginTop: 20, backgroundColor: 'red'}}
      />
    </View>
  </SafeAreaView>
);

const Dashboard = ({navigation, route}) => {
  const [index, setIndex] = React.useState(2);
  const [routes] = React.useState([
    {
      key: 'cuenta',
      title: 'Cuenta',
      focusedIcon: 'account',
      unfocusedIcon: 'account-outline',
    },
    {
      key: 'vehiculo',
      title: 'Vehiculo',
      focusedIcon: 'car-select',
      unfocusedIcon: 'car',
    },
    {
      key: 'home',
      title: ' ',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {key: 'recents', title: 'Reserva', focusedIcon: 'history'},
    {
      key: 'pay',
      title: 'Pagos',
      focusedIcon: 'cash',
      unfocusedIcon: 'cash-fast',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    cuenta: CuentaRoute,
    vehiculo: CrearCarScreen,
    recents: ReservaScreen,
    home: HomeRoute,
    pay: PayScreen,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Dashboard;
