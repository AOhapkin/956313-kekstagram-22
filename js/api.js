import {isEscEvent} from './utils.js';

const errorTemplate = document.querySelector('#error').content;
const errorMessage = errorTemplate.querySelector('.error').cloneNode(true);
const errorCloseButton = errorMessage.querySelector('.error__button');
// const errorText = errorMessage.querySelector('.error__title');
const MESSAGE_TIME = 4000;

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

function showError (message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, MESSAGE_TIME);
}

function onErrorCloseButtonClick () {
  hideDownloadError();
}

function onDocumentKeydown (evt) {
  if (isEscEvent(evt)) {
    hideDownloadError();
  }
}

function hideDownloadError () {
  errorCloseButton.removeEventListener('click', onErrorCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeChild(errorMessage);
}

function onUploadFormSubmit (evt) {
  evt.preventDefault();
  sendData();
}

function sendData (data) {
  return fetch('https://22.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      if(!response.ok) {
        const {statusText, status} = response;
        showError(statusText, status);
      }
    });
}

export {getData, onUploadFormSubmit}
