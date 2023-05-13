import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Snackbar, Text} from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {
  lastNameValidator,
  emailValidator,
  nameValidator,
  passwordValidator,
  ccValidator,
} from '../helpers/inputsValidator';
import {petition} from '../core/promises';

export default function RegisterScreen({navigation}) {
  const [name, setName] = useState({value: '', error: ''});
  const [lastname, setLastName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [cc, setCc] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [load, setLoad] = useState(false);
  const [snackbar, setSnackbar] = React.useState({
    active: false,
    msg: '',
  });
  const onDismissSnackBar = () => setSnackbar({...snackbar, active: false});

  const onSignUpPressed = async () => {
    setLoad(true);
    const nameError = nameValidator(name.value);
    const lastnameError = lastNameValidator(name.value);
    const ccError = ccValidator(cc.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError || lastnameError || ccError) {
      setName({...name, error: nameError});
      setLastName({...name, error: lastnameError});
      setEmail({...email, error: emailError});
      setCc({...cc, error: ccError});
      setPassword({...password, error: passwordError});
      setLoad(false);
      return;
    }
    let data = {
      identifier: cc.value,
      password: password.value,
      nombres: name.value,
      apellidos: lastname.value,
      email: email.value,
    };

    let res = await petition('login', 'create', 'POST', data);

    setSnackbar({msg: res.data.msg, active: true});
    if (res.data.status) {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      }, 500);
    }
    setLoad(false);
  };

  return (
    <Background>
      <Snackbar
        wrapperStyle={{top: '10%'}}
        visible={snackbar.active}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          onPress: () => {},
        }}>
        {snackbar.msg}
      </Snackbar>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <TextInput
        label="Nombres"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({value: text, error: ''})}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Apellidos"
        returnKeyType="next"
        value={lastname.value}
        onChangeText={text => setLastName({value: text, error: ''})}
        error={!!lastname.error}
        errorText={lastname.error}
      />
      <TextInput
        label="Identificacion"
        returnKeyType="next"
        value={cc.value}
        onChangeText={text => setCc({value: text, error: ''})}
        error={!!cc.error}
        errorText={cc.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Correo electronico"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Contraseña"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        loading={load}
        disabled={load}
        style={{marginTop: 24}}>
        Regístrate
      </Button>
      <View style={styles.row}>
        <Text>¿Ya tiene una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
