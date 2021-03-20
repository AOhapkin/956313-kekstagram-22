import {getServerData} from './data.js';
import {createPictures} from './pictures-preview.js';
import './img-upload.js';
import './editor.js';

getServerData()
  .then((pictures) => createPictures(pictures));
