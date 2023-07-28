const SIMILAR_PHOTO_DESCRIPTION_COUNT = 25; // количество объектов в массиве
const MIN_LIKES_COUNT = 15; // минимальное число лайков
const MAX_LIKES_COUNT = 200; // максимальное число лайков
const MAX_COMMENTS_COUNT = 30; // максимальное число комментариев
const MAX_AVATARS_COUNT = 6; // максимальное число аватарок
const SENTENCES_COUNT = 2; // число предложений в комментарии одного человека
const MAX_COMMENT_ID_COUNT = 700; // максимальное число id комментариев (большое рандомное число)
const NUMBER_COMMENTS_DISPLAYED = 5; // число отображаемых комментариев
const MAX_LENGTH_HASHTAG = 19; // максимальная длина хештега
const MAX_NUMBER_HASHTAGS = 5; // максимальное число хештегов
const MAX_LENGTH_COMMENT = 140; // максимальная длина символов комментария
const SCALE_VALUE_MAXIMUM = '100%'; // максимальное значение масштаба
const SCALE_VALUE_MINIMUM = '25%'; // минимальное значение масштаба
const STEP_SCALE = 25; // шаг масштаба изображения
const ALERT_SHOW_TIME = 5000; // время показа ошибки
const NUMBER_RANDOM_PHOTOS = 10; // число рандомных фото
const RERENDER_DELAY = 500; // время задержки отрисовки
const ACCEPTABLE_FILE_TYPES = ['jpg', 'jprg', 'png']; // разрешённые типы файлов

export {
  SIMILAR_PHOTO_DESCRIPTION_COUNT,
  MIN_LIKES_COUNT,
  MAX_LIKES_COUNT,
  MAX_COMMENTS_COUNT,
  MAX_AVATARS_COUNT,
  SENTENCES_COUNT,
  MAX_COMMENT_ID_COUNT,
  NUMBER_COMMENTS_DISPLAYED,
  MAX_LENGTH_HASHTAG,
  MAX_NUMBER_HASHTAGS,
  MAX_LENGTH_COMMENT,
  STEP_SCALE,
  SCALE_VALUE_MAXIMUM,
  SCALE_VALUE_MINIMUM,
  ALERT_SHOW_TIME,
  NUMBER_RANDOM_PHOTOS,
  RERENDER_DELAY,
  ACCEPTABLE_FILE_TYPES
};
