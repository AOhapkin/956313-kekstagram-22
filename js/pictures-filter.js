const RANDOM_PHOTO_COUNT = 10;

function setFilterDefault (pictures) {
  return pictures;
}

function setFilterRandom (pictures) {
  let randomPictures = pictures.slice().sort(() => Math.random() - 0.5);

  return randomPictures.slice(0, RANDOM_PHOTO_COUNT);
}

function setFilterDiscussed (pictures) {
  return pictures.sort((a, b) => b.comments.length - a.comments.length);
}

export {setFilterDefault, setFilterRandom, setFilterDiscussed}
