export function nameValidator(name) {
  if (!name) return 'El nombre no puede estar vacío';
  return '';
}

export function lastNameValidator(name) {
  if (!name) return 'El apellido no puede estar vacío.';
  return '';
}

export function ccValidator(name) {
  if (!name) return 'La identificacion puede estar vacío.';
  return '';
}
export function numeroDestinoValidator(name) {
  if (!name) return 'El numero no puede estar vacío.';
  return '';
}
export function cantidadValidator(name) {
  if (!name) return 'La cantidad no puede estar vacía.';
  return '';
}
export function referenciaValidator(name) {
  if (!name) return 'La referencia no puede estar vacía.';
  return '';
}
export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) return 'El correo electrónico no puede estar vacío.';
  if (!re.test(email))
    return '¡Ooops! Necesitamos una dirección de correo electrónico valida.';
  return '';
}

export function passwordValidator(password) {
  if (!password) return 'La contraseña no puede estar vacía.';
  if (password.length < 5)
    return 'La contraseña debe tener al menos 5 caracteres.';
  return '';
}

export function isNumeric(numero) {
  const reg = new RegExp(/^[0-9]+$/);
  if (reg.test(numero) || numero === '') {
    return true;
  }
  return false;
}

export const primeraLetra = str => {
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
};
