const uploadForm = document.querySelector('.img-upload__form');
const previewImage = uploadForm.querySelector('.img-upload__preview');
const effectsList = uploadForm.querySelector('.effects__list');
const sliderBlock = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelInput = uploadForm.querySelector('.effect-level__value');
const slider = uploadForm.querySelector('.effect-level__slider');
const effectsData = {
  none: {
    id: 'effect-none',
    filter: '',
  },
  chrome: {
    id: 'effect-chrome',
    class: 'effects__preview--chrome',
    filter: 'grayscale',
  },
  sepia: {
    id: 'effect-sepia',
    class: 'effects__preview--sepia',
    filter: 'sepia',
  },
  marvin: {
    id: 'effect-marvin',
    class: 'effects__preview--marvin',
    filter: 'marvin',
  },
  phobos: {
    id: 'effect-phobos',
    class: 'effects__preview--phobos',
    filter: 'phobos',
  },
  heat: {
    id: 'effect-heat',
    class: 'effects__preview--heat',
    filter: 'heat',
  },
}

/* global noUiSlider:readonly */

function setSlider () {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });
  sliderBlock.classList.add('hidden');
}

setSlider();

function removeSlider () {
  slider.noUiSlider.destroy();
  previewImage.style.filter = effectsData.none.filter;
  previewImage.className = 'img-upload__preview';
  effectLevelInput.value = '';
}

function setEffect (evt) {
  // показать и скрыть слайдер
  if (evt.target.id === effectsData.none.id) {
    sliderBlock.classList.add('hidden');
  } else {
    sliderBlock.classList.remove('hidden');
  }

  // сброс классов
  previewImage.className = 'img-upload__preview';

  switch (evt.target.id) {
    case effectsData.none.id:
      effectLevelInput.value = '';
      break;

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

export {setSlider, removeSlider}
