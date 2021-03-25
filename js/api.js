import {showError} from './utils.js';

const API_URL = 'https://22.javascript.pages.academy/kekstagram';

function getData (onSuccess) {
  return fetch(`${API_URL}/data`)
    .then((response) => response.json())
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch(() => {
      showError('Не удалось получить данные. Попробуйте позже.');
    });
}

function sendData (onSuccess, onError, data) {
  fetch(
    API_URL,
    {
      method: 'POST',
      data,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
}

export {getData, sendData}
