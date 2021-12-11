import axios from 'axios';

export function commonRequestPost(data, url) {
  return axios.post(`${url}`, data);
}

export function commonRequestGet(data, url) {
  return axios.get(`${url}`, data);
}

export function commonRequestDelete(data, url) {
  return axios.delete(`${url}`, data);
}
