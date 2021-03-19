import {createPictures} from './pictures-preview.js';
// import {data} from './random-data.js';
import './img-upload.js';
import './editor.js';
import {getServerData} from './data.js'

getServerData()
  .then((pictures) => createPictures(pictures));
