import axios from 'axios';

const urlGen = 'https://loginapp.fly.dev/v1';
export const petition = async (service, path, method, data) => {
  let result = {data: {status: false, msg: 'ocurrió un error con la petición'}};
  let url = `${urlGen}/${service}/${path}`;
  await axios({method, url, data})
    .then(res => {
      result = res;
    })
    .catch(e => {
      console.log('petition', e.message);
    });
  return result;
};
