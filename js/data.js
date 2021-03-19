import {isEscEvent} from './utils.js';

const errorTemplate = document.querySelector('#error').content;
const downloadErrorMessage = errorTemplate.querySelector('.error').cloneNode(true);
const errorCloseButton = downloadErrorMessage.querySelector('.error__button');
const errorText = downloadErrorMessage.querySelector('.error__title');
const MESSAGE_TIME = 4000;

function getServerData () {
  return fetch('https://22.javascript.pages.academy/kekstagram/dta')
    .then(checkStatus)
    .then((response) => response.json())
    .catch(showDownloadError);
}


function checkStatus(response) {
  if (response.ok) {
    return response;
  }

  const {statusText, status} = response;
  throw new Error(`${status} — ${statusText}`);
}

function showDownloadError () {
  downloadErrorMessage.style.zIndex = '100';
  document.body.append(downloadErrorMessage);
  errorText.textContent = 'Попробуйте позже!';
  errorCloseButton.textContent = 'Ок';
  errorCloseButton.addEventListener('click', onErrorCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

  setTimeout(() => {
    document.body.remove(downloadErrorMessage);
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
  document.body.remove(downloadErrorMessage);
}

export {getServerData}
