const SIMILAR_PHOTO_DESCRIPTION_COUNT = 25; // количество объектов в массиве
const MIN_LIKES_COUNT = 15; // минимальное число лайков
const MAX_LIKES_COUNT = 200; // максимальное число лайков
const MAX_COMMENTS_COUNT = 30; // максимальное число комментариев
const MAX_AVATARS_COUNT = 6; // максимальное число аватарок
const SENTENCES_COUNT = 2; // число предложений в комментарии одного человека
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

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateCommentId = createRandomIdFromRangeGenerator(1, 700); // вместо 700 можно поставить любое число

function getCommentMessage (array, maxNumbersOfSentences) {
  const commentMessage = [];
  const count = getRandomInteger(1,maxNumbersOfSentences);
  for (let i = 0; i < count; i++) {
    let currentCommentMessage = getRandomArrayElement(array);
    if (commentMessage.length >= messages.length) {
      return null;
    }
    while (commentMessage.includes(currentCommentMessage)) {
      currentCommentMessage = getRandomArrayElement(array);
    }
    commentMessage.push(currentCommentMessage);
  }
  return commentMessage.join(' ');
}

const createComments = () => ({
  id : generateCommentId(),
  avatar : `img/avatar-${getRandomInteger(1, MAX_AVATARS_COUNT)}.svg`,
  message : getCommentMessage(messages, SENTENCES_COUNT),
  name: getRandomArrayElement(names)
});

const generatePhotoId = createRandomIdFromRangeGenerator(1, SIMILAR_PHOTO_DESCRIPTION_COUNT); // Количество id и url равно количеству объектов
const generateUrl = createRandomIdFromRangeGenerator(1, SIMILAR_PHOTO_DESCRIPTION_COUNT);
const generateLikes = createRandomIdFromRangeGenerator(MIN_LIKES_COUNT, MAX_LIKES_COUNT);

const createPhotoDescription = () => ({
  id : generatePhotoId(),
  url : `photos/${generateUrl()}.jpg`,
  description : getRandomArrayElement(descriptions),
  likes : generateLikes(),
  comments : Array.from({length: getRandomInteger(0, MAX_COMMENTS_COUNT)}, createComments)
});

const similarPhotoDescription = Array.from({length: SIMILAR_PHOTO_DESCRIPTION_COUNT}, createPhotoDescription);
