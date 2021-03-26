import {getData} from './api.js';
import {createPictures} from './pictures-preview.js';
import {showError} from './utils.js';
import {setUserFormSubmit} from './img-upload.js';
import {showUploadSuccessMessage} from './upload-messages.js';
import './editor.js';

getData(createPictures, showError);
setUserFormSubmit(showUploadSuccessMessage);
