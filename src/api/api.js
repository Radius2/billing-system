import axios from 'axios';
import jwt from 'jsonwebtoken';

const BASE_URL = 'https://b644ad81271d.ngrok.io/';
const api = axios.create({
 baseURL: BASE_URL,
});

function setToken(token) {
  localStorage.setItem('token', token);
  api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

function deleteToken() {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
}

export function getToken(username, password) {
  return jwt.sign({ username: username, password: password }, 'jwt_secret_key');
}

export function login(token) {
  return api
    .get(BASE_URL+'/login/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(resp => {
      setToken(token);
      return resp;
    })
    .catch(err => {
      deleteToken();
      return Promise.reject(err);
    });
}

export function getForm(path) {
  return api.get('form_types').then(resp => console.log(resp));
}
