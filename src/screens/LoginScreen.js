import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import {petition} from '../core/promises';
import { ccValidator, passwordValidator } from "../helpers/inputsValidator";

export default function LoginScreen({navigation}) {
  const [cc, setCc] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [load, setLoad] = useState(false);
  const onLoginPressed = async () => {
    setLoad(true);
    const ccError = ccValidator(cc.value);
    const passwordError = passwordValidator(password.value);
    if (ccError || passwordError) {
      setCc({...cc, error: ccError});
      setPassword({...password, error: passwordError});
      setLoad(false)
      return;
    }
    let res = await petition('login', 'auth', 'POST', {
      identifier: cc.value,
      password: password.value,
    });
    if (res.data.status) {
      let newVar = {user: res.data.data};
      navigation.reset({
        index: 0,
        routes: [{name: 'Dashboard', params: newVar}],
      });
    }
    setLoad(false);
  };

  return (
    <Background>
      <Logo />
      <TextInput
        label="Identificador"
        returnKeyType="next"
        value={cc.value}
        onChangeText={text => setCc({value: text, error: ''})}
        error={!!cc.error}
        errorText={cc.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>¿Ha olvidado su contraseña?</Text>
        </TouchableOpacity>
      </View>
      <Button
        mode="contained"
        loading={load}
        disabled={load}
        onPress={onLoginPressed}>
        Iniciar sesión
      </Button>
      <View style={styles.row}>
        <Text>¿No tiene cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
