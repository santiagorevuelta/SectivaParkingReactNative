import React, {useState} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import {View, Text} from 'react-native';
export default function Dashboard({navigation, route}) {
  console.log(route.params);
  const [user, setUser] = useState(route.params.user);

  return (
    <Background>
      <Logo />
      <View>
        <Text>{user.nombres + ' ' + user.apellidos}</Text>
        <Text>{user.correo}</Text>
        <Text>{user.identificador}</Text>
      </View>
    </Background>
  );
}
