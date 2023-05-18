import * as React from 'react';
import {BottomNavigation, Text, Button} from 'react-native-paper';
import {SafeAreaView, View} from 'react-native';
import CrearCarScreen from './CrearCarScreen';
import ReservaScreen from './ReservaScreen';
import PayScreen from './PayScreen';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const CuentaRoute = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Button
        icon="account"
        mode="contained"
        onPress={async () => {
          await AsyncStorage.removeItem('login');
          navigation.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}],
          });
        }}>
        Cerrar sesion
      </Button>
    </SafeAreaView>
  );
};

const HomeRoute = () => (
  <SafeAreaView>
    <Text
      style={{
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
      }}>
      Encuentra tu parqueadero
    </Text>
    <View style={{width: '100%', height: '95%'}}>
      <WebView
        source={{
          uri: 'https://www.google.com/maps/search/parqueaderos/@6.3401123,-75.5654812,15z/data=!3m1!4b1',
        }}
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
