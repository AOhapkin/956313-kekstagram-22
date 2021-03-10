import {effectsData} from './effects-data.js'

const editor = document.querySelector('.img-upload__overlay');
const scalelUpButton = editor.querySelector('.scale__control--bigger');
const scaleDownButton = editor.querySelector('.scale__control--smaller');
const scaleInput = editor.querySelector('.scale__control--value');
const scaleDefault = 100;
const scaleStep = 25;
let scale = scaleDefault;
const uploadForm = document.querySelector('.img-upload__form');
const preview = uploadForm.querySelector('.img-upload__preview');
const effectsList = uploadForm.querySelector('.effects__list');
const sliderBlock = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelInput = uploadForm.querySelector('.effect-level__value');
const slider = uploadForm.querySelector('.effect-level__slider');
let currentEffect = '';

// Масштабирование

scaleInput.value = scale + '%';

scalelUpButton.addEventListener('click', onScaleUpClick);

function onScaleUpClick () {
  if (scale < 100) {
    scale += scaleStep;
    scaleInput.value = scale + '%';
    preview.style.transform = 'scale(' + scale/100 + ')';
  }
}

scaleDownButton.addEventListener('click', onScaleDownClick);

function onScaleDownClick () {
  if (scale > 25) {
    scale -= scaleStep;
    scaleInput.value = scale + '%';
    preview.style.transform = 'scale(' + scale/100 + ')';
  }
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
}

function removeSlider () {
  slider.noUiSlider.destroy();
  preview.style.filter = effectsData.none.filter;
  preview.className = 'img-upload__preview';
  effectLevelInput.value = '';
}

function setSliderValue (filter, units) {
  slider.noUiSlider.on('update', (values, handle) => {
    effectLevelInput.value = values[handle];
    preview.style.filter = `${filter}(${effectLevelInput.value}${units})`;
  })
}

function setEffect (evt) {
  currentEffect = effectsData[evt.target.value];

  preview.className = 'img-upload__preview';
  preview.classList.add('effects__preview--' + evt.target.value);

  if (!currentEffect) {
    effectLevelInput.value = '';
    sliderBlock.classList.add('hidden');
  } else {
    effectLevelInput.value = 100;
    sliderBlock.classList.remove('hidden');
  }


  // СТАРАЯ ВЕРСИЯ
  // показать и скрыть слайдер
  // if (evt.target.id === effectsData.none.id) {
  //   sliderBlock.classList.add('hidden');
  // } else {
  //   sliderBlock.classList.remove('hidden');
  // }

  // // сброс классов
  // preview.className = 'img-upload__preview';

  // switch (evt.target.id) {
  //   case effectsData.none.id:
  //     effectLevelInput.value = '';
  //     break;

  //   case effectsData.chrome.id:
  //     preview.classList.add(effectsData.chrome.class);
  //     slider.noUiSlider.updateOptions({
  //       range: {
  //         min: effectsData.chrome.min,
  //         max: effectsData.chrome.max,
  //       },
  //       start: effectsData.chrome.max,
  //       step: effectsData.chrome.step,
  //     });
  //     setSliderValue(effectsData.chrome.filter, effectsData.chrome.step);
  //     break;

  //   case effectsData.sepia.id:
  //     preview.classList.add(effectsData.sepia.class);
  //     break;

  //   case effectsData.marvin.id:
  //     preview.classList.add(effectsData.marvin.class);
  //     break;

  //   case effectsData.phobos.id:
  //     preview.classList.add(effectsData.phobos.class);
  //     break;

  //   case effectsData.heat.id:
  //     preview.classList.add(effectsData.heat.class);
  //     break;
  // }
}

effectsList.addEventListener('change', setEffect);

export {setSlider, removeSlider}
