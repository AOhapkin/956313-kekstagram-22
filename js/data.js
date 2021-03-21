import {isEscEvent} from './utils.js';

const errorTemplate = document.querySelector('#error').content;
const errorMessage = errorTemplate.querySelector('.error').cloneNode(true);
const errorCloseButton = errorMessage.querySelector('.error__button');
const errorText = errorMessage.querySelector('.error__title');
const MESSAGE_TIME = 4000;

function getServerData () {
  return fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then(checkStatus)
    .then((response) => response.json())
    .catch(showError);
}

function checkStatus(response) {
  if (response.ok) {
    return response;
  }

  const {statusText, status} = response;

  throw new Error(`${status} — ${statusText}`);
  // сообщение для пользователя
}

function showError (statusText, status) {
  errorMessage.style.zIndex = '100';
  document.body.append(errorMessage);
  errorText.textContent = 'Попробуйте позже! <br>' + status + ' ' + statusText;
  errorCloseButton.textContent = 'Ок';
  errorCloseButton.addEventListener('click', onErrorCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

  setTimeout(() => {
    hideDownloadError();
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

export {getServerData}
