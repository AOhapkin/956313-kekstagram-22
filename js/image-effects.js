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
    min: 0,
    max: 1,
    step: 0.1,
  },
  sepia: {
    id: 'effect-sepia',
    class: 'effects__preview--sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
  },
  marvin: {
    id: 'effect-marvin',
    class: 'effects__preview--marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    units: '%',
  },
  phobos: {
    id: 'effect-phobos',
    class: 'effects__preview--phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    units: 'px',
  },
  heat: {
    id: 'effect-heat',
    class: 'effects__preview--heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
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
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  sliderBlock.classList.add('hidden');
  effectsList.addEventListener('change', setEffect);
}

function removeSlider () {
  slider.noUiSlider.destroy();
  previewImage.style.filter = effectsData.none.filter;
  previewImage.className = 'img-upload__preview';
  effectLevelInput.value = '';
}

function setSliderValue (filter, units) {
  slider.noUiSlider.on('update', (values, handle) => {
    effectLevelInput.value = values[handle];
    previewImage.style.filter = `${filter}(${effectLevelInput.value}${units})`;
  })
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
      slider.noUiSlider.updateOptions({
        range: {
          min: effectsData.chrome.min,
          max: effectsData.chrome.max,
        },
        start: effectsData.chrome.max,
        step: effectsData.chrome.step,
      });
      setSliderValue(effectsData.chrome.filter, effectsData.chrome.step);
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

export {setSlider, removeSlider}
