import {createPictures} from './pictures-preview.js';
import './img-upload.js';
import './editor.js';
import {getServerData} from './data.js'

getServerData()
  .then((pictures) => createPictures(pictures));
