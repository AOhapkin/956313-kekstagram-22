const API_URL = 'https://22.javascript.pages.academy/kekstagram';

function getData (onSuccess, onError) {
  return fetch(`${API_URL}/data`)
    .then((response) => response.json())
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch(() => {
      onError();
    });
}

function sendData (onSuccess, onError, data) {
  fetch(
    API_URL,
    {
      method: 'POST',
      body: data,
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
