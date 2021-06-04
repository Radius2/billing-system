import axios from 'axios';
import jwt from 'jsonwebtoken';

//"http://posterc.kz:44475/",
const BASE_URL = 'http://posterc.kz:44475/'

const api = axios.create({
    baseURL: BASE_URL,
});

function setToken(token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export function deleteToken() {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
}

export function getToken(username, password) {
    return jwt.sign({username: username, password: password}, 'jwt_secret_key');
}

export function login(token) {
    return api
        .get('/login/', {
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

export function getHandbook(nameHandbook) {
    return api.get('/' + nameHandbook);
}

export function getElementHandbook(nameHandbook, id) {
    return api.get('/' + nameHandbook + '/' + id)
}

export function delElementHandbook(nameHandbook, id) {
    return api.post('/' + nameHandbook + '_del',
        {id});
}

export function addElementHandbook(nameHandbook, payload) {
    return api.post('/' + nameHandbook + '_add',
        payload);
}

export function updElementHandbook(nameHandbook, payload) {
    return api.post('/' + nameHandbook + '_upd',
        payload);
}