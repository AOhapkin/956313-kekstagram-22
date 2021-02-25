'use strict'

import {createPictures} from './pictures-preview.js';
import {generatePhotos} from './random-data.js';
import './img-upload.js';

const data = generatePhotos();
createPictures(data);
