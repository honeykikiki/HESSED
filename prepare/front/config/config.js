/* eslint-disable import/prefer-default-export */
// export const baseURL = 'http://hessedweb.cafe24.com/'; // 카페24
// export const baseURL = 'http://hilltophessed.com/'; // 카페24

// export const baseURL = 'http://192.168.0.105:8081'; // 회사
// export const baseURL = 'http://192.168.45.247:8081'; // 회사

export const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://hilltophessed.com/'
    : 'http://hilltophessed.com/';
