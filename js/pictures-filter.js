import {getRandomFromRange} from './utils.js';

const RANDOM_PHOTO_COUNT = 10;

function setFilterDefault (pictures) {
  return pictures;
}

function setFilterRandom (pictures) {
  let randomPictureIndex = getRandomFromRange(0, pictures.length -1);
  let randomPictures = [];

  for (let i = 0; i < RANDOM_PHOTO_COUNT; i++) {
    randomPictures.push(pictures[randomPictureIndex]);
  }

  return randomPictures;
}

function setFilterDiscussed (pictures) {
  return pictures.sort((a, b) => b.comments.length - a.comments.length);
}

export {setFilterDefault, setFilterRandom, setFilterDiscussed}
