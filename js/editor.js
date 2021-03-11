import {EffectsData} from './effects-data.js'

const editor = document.querySelector('.img-upload__overlay');
const scalelUpButton = editor.querySelector('.scale__control--bigger');
const scaleDownButton = editor.querySelector('.scale__control--smaller');
const scaleInput = editor.querySelector('.scale__control--value');
const SCALE_DEFAULT = 100;
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
let scale = SCALE_DEFAULT;
const uploadForm = document.querySelector('.img-upload__form');
const preview = uploadForm.querySelector('.img-upload__preview');
const effectsList = uploadForm.querySelector('.effects__list');
const sliderBlock = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelInput = uploadForm.querySelector('.effect-level__value');
const slider = uploadForm.querySelector('.effect-level__slider');
let currentEffect = '';

function setScaleControls () {
  scaleInput.value = SCALE_DEFAULT + '%';
  scalelUpButton.addEventListener('click', onScaleUpClick);
  scaleDownButton.addEventListener('click', onScaleDownClick);
}

function onScaleUpClick () {
  if (scale < SCALE_MAX) {
    scale += SCALE_STEP;
    scaleInput.value = scale + '%';
    preview.style.transform = 'scale(' + scale/SCALE_MAX + ')';
  }
}

function onScaleDownClick () {
  if (scale > SCALE_MIN) {
    scale -= SCALE_STEP;
    scaleInput.value = scale + '%';
    preview.style.transform = 'scale(' + scale/SCALE_MAX + ')';
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
  slider.noUiSlider.on('update', function (values, handle) {
    // inputs[handle].value = values[handle];
    console.log(values);
  });
}

function removeSlider () {
  slider.noUiSlider.destroy();
  preview.style.filter = '';
  preview.className = 'img-upload__preview';
  effectLevelInput.value = '';
}

function setEffect (evt) {
  currentEffect = EffectsData[evt.target.value];

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

export {setSlider, removeSlider, setScaleControls}
