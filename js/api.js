import {showError} from './utils.js';
import {showErrorMessage} from './upload-messages.js';

const API_URL = 'https://22.javascript.pages.academy/kekstagram';

function getData () {
  return fetch(`${API_URL}/data`)
    .catch(() => {
      showError('Не удалось получить данные. Попробуйте позже.');
    })
    .then((response) => response.json());
}

function sendData (data) {
  return fetch(API_URL, {
    method: 'POST',
    body: data,
  })
    .catch(() => {
      showErrorMessage();
    });
}

export {getData, sendData}
