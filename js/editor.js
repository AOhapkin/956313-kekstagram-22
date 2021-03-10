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

function setEffect (evt) {
  currentEffect = effectsData[evt.target.value];

  preview.className = 'img-upload__preview';
  preview.classList.add('effects__preview--' + evt.target.value);

  if (!currentEffect) {
    effectLevelInput.value = '';
    sliderBlock.classList.add('hidden');
  } else {
    sliderBlock.classList.remove('hidden');
  }
}

effectsList.addEventListener('change', onEffectsListChange);

function onEffectsListChange (evt) {
  setEffect(evt);
}

export {setSlider, removeSlider}
