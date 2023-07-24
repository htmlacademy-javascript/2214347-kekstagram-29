import {MAX_COMMENT_ID_COUNT, SIMILAR_PHOTO_DESCRIPTION_COUNT, MIN_LIKES_COUNT, MAX_LIKES_COUNT, MAX_AVATARS_COUNT, SENTENCES_COUNT, MAX_COMMENTS_COUNT} from './constants.js';
import {getRandomArrayElement, getRandomInteger, createRandomIdFromRangeGenerator, getCommentMessage} from './util.js';

const descriptions = [
  'Сумашедшие должны держаться вместе.',
  'Временно в режиме off-line.',
  'Некоторые дни начинаются лучше остальных.',
  'Нормальные люди утром просыпаются, а я восстаю.',
  'Икона стиля районного масштаба.',
  'Навстречу новым приключениям.',
  'Настойчивость окупается сполна.',
  'И мое сердце остановилось, мое сердце замерло.',
  'Когда любое совместное занятие превращается в приключение.',
  'Как мало нужно для счастья.',
  'Мы легли на дно, мы зажгли огни, во Вселенной только мы одни.',
  'Стремись вдохновлять.'
];
const names = [
  'Екатерина',
  'Василиса',
  'Антон',
  'Мария',
  'Константин',
  'Андрей',
  'Виктория',
  'Сергей',
  'Александра',
  'Александр',
  'Людмила'
];
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const generateCommentId = createRandomIdFromRangeGenerator(1, MAX_COMMENT_ID_COUNT);
const generatePhotoId = createRandomIdFromRangeGenerator(1, SIMILAR_PHOTO_DESCRIPTION_COUNT); // Количество id и url равно количеству объектов
const generateUrl = createRandomIdFromRangeGenerator(1, SIMILAR_PHOTO_DESCRIPTION_COUNT);
const generateLikes = createRandomIdFromRangeGenerator(MIN_LIKES_COUNT, MAX_LIKES_COUNT);

const createComment = () => ({
  id : generateCommentId(),
  avatar : `img/avatar-${getRandomInteger(1, MAX_AVATARS_COUNT)}.svg`,
  message : getCommentMessage(messages, SENTENCES_COUNT),
  name: getRandomArrayElement(names)
});

const createPhotoDescription = () => ({
  id : generatePhotoId(),
  url : `photos/${generateUrl()}.jpg`,
  description : getRandomArrayElement(descriptions),
  likes : generateLikes(),
  comments : Array.from({length: getRandomInteger(0, MAX_COMMENTS_COUNT)}, createComment)
});

const createPhotoDescriptions = () => Array.from({length: SIMILAR_PHOTO_DESCRIPTION_COUNT}, createPhotoDescription);

export {createPhotoDescriptions};
