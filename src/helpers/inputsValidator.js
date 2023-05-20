export function nameValidator(name) {
  if (!name) {
    return 'El nombre no puede estar vacío';
  }
  return '';
}

export function lastNameValidator(name) {
  if (!name) {
    return 'El apellido no puede estar vacío.';
  }
  return '';
}

export function ccValidator(name) {
  if (!name) {
    return 'La identificacion no puede estar vacío.';
  }
  return '';
}

export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) {
    return 'El correo electrónico no puede estar vacío.';
  }
  if (!re.test(email)) {
    return '¡Ooops! Necesitamos una dirección de correo electrónico valida.';
  }
  return '';
}

export function passwordValidator(password) {
  if (!password) {
    return 'La contraseña no puede estar vacía.';
  }
  if (password.length < 5) {
    return 'La contraseña debe tener al menos 5 caracteres.';
  }
  return '';
}

export function isNumeric(numero) {
  const reg = new RegExp(/^[0-9]+$/);
  return reg.test(numero) || numero === '';
}

export const primeraLetra = str => {
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
};
