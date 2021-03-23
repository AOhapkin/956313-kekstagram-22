import {getData} from './api.js';
import {createPictures} from './pictures-preview.js';
import './img-upload.js';
import './editor.js';

getData()
  .then((pictures) => createPictures(pictures));
