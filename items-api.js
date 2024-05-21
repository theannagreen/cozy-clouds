import sendRequest from './send-request';
import axios from 'axios';

const BASE_URL = '/api/';

export function getAll() {
    return sendRequest(BASE_URL);
}

export function getById(id) {
    return axios.get(`${BASE_URL}/${id}`);
}