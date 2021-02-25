const uploadForm = document.querySelector('.img-upload__form');
const previewImage = uploadForm.querySelector('.img-upload__preview');
const effectsList = uploadForm.querySelector('.effects__list');
const effectsData = {
  none: {
    id: 'effect-none',
  },
  chrome: {
    id: 'effect-chrome',
    class: 'effects__preview--chrome',
  },
  sepia: {
    id: 'effect-sepia',
    class: 'effects__preview--sepia',
  },
  marvin: {
    id: 'effect-marvin',
    class: 'effects__preview--marvin',
  },
  phobos: {
    id: 'effect-phobos',
    class: 'effects__preview--phobos',
  },
  heat: {
    id: 'effect-heat',
    class: 'effects__preview--heat',
  },
}

function setEffect (evt) {
  // сброс классов
  previewImage.className = 'img-upload__preview';

  switch (evt.target.id) {

    case effectsData.chrome.id:
      previewImage.classList.add(effectsData.chrome.class);
      break;

    case effectsData.sepia.id:
      previewImage.classList.add(effectsData.sepia.class);
      break;

    case effectsData.marvin.id:
      previewImage.classList.add(effectsData.marvin.class);
      break;

    case effectsData.phobos.id:
      previewImage.classList.add(effectsData.phobos.class);
      break;

    case effectsData.heat.id:
      previewImage.classList.add(effectsData.heat.class);
      break;

  }
}

effectsList.addEventListener('change', setEffect);
