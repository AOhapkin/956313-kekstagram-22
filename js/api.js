import {showError} from './utils.js';

function getData () {
  return fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then(checkStatus)
    .then((response) => response.json());
}

function checkStatus(response) {
  if (response.ok) {
    return response;
  }

  showError('Не удалось получить данные. Попробуйте позже.');
}

function sendData (data) {
  return fetch('https://22.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      if(!response.ok) {
        showError('Не удалось отправить данные. Попробуйте позже.');
      }
    });
}

export {getData, sendData}
