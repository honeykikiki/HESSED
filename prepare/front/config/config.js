/* eslint-disable import/prefer-default-export */

// export const baseURL = 'http://192.168.0.105:8081'; // 회사
// export const baseURL = 'http://192.168.45.159:8081'; //

// export const baseURL = 'http://211.244.21.147:8081'; // 현준이형집

export const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://hilltophessed.com/'
    : 'http://hilltophessed.com/';
