import {getData} from './api.js';
import {createPictures, showFilters, renderFilteredPictures} from './pictures-preview.js';
import './img-upload.js';
import {showError} from './utils.js';
import './editor.js';

function onDataSuccess (pictures) {
  createPictures(pictures);
  showFilters();
  renderFilteredPictures(pictures);
}

function onDataFail () {
  showError();
}

getData(onDataSuccess, onDataFail);
