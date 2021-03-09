import {getRandomFromRange, getRandomArrayElement} from './utils.js'

const NAMES = [
  'Иван',
  'Себастьян',
  'Мария',
  'Кристоф',
  'Наташа',
  'Юлия',
  'Кирилл',
  'Саша',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Моё лучшее фото за всё время!',
  'Сморите! Получилась красота)',
  'Сейчас лучшее время, чтобы выложить фотографию.',
  'Зачем стараться, если никто не поставит лайк этому фото?',
  'Не могу придумать хорошее описание для этой фотографии. Есть идеи?',
  'Я у мамы фотограф!',
];

const PHOTOS_COUNT = 25;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_COMMENT_COUNT = 0;
const MAX_COMMENT_COUNT = 5;
const MIN_LIKES = 15;
const MAX_LIKES = 200;

function generateComments () {
  const commentCount = getRandomFromRange(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT);
  let comments = [];

  for (let i = 0; i < commentCount; i++) {
    comments.push({
      id: i,
      avatar: 'img/avatar-' + getRandomFromRange(MIN_AVATAR_ID, MAX_AVATAR_ID) + '.svg',
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES),
    });
  }

  return comments;
}

function generatePhotos () {
  let photos = [];

  for (let i = 0; i <= PHOTOS_COUNT; i++) {
    photos.push({
      id: i,
      url: 'photos/' + getRandomFromRange(1, PHOTOS_COUNT) + '.jpg',
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomFromRange(MIN_LIKES, MAX_LIKES),
      comments: generateComments(),
    })
  }

  return photos;
}

const data = generatePhotos();

export {data};
