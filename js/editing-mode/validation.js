import {MAX_LENGTH_HASHTAG, MAX_NUMBER_HASHTAGS, MAX_LENGTH_COMMENT} from '../constants.js';
import {form, inputHashtag, inputComment, buttonSubmit} from './dom-elements.js';
import { sendData } from '../api.js';
import { showMessage, onEscapePress } from './messages.js';

const ButtonSubmitText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorClass: 'img-upload__field-wrapper--invalid', // Класс, обозначающий невалидное поле
  successClass: 'img-upload__field-wrapper--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'div', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
});

const hashtagRule = new RegExp(`^#[a-zа-яё0-9]{1,${MAX_LENGTH_HASHTAG}}$`, 'i');

const getHashtagsArray = (value) => value.split(' ');

const isEveryHashtagValid = (value) => {
  if (value === '') {
    return true;
  }
  const arrayHashtags = getHashtagsArray(value);
  return arrayHashtags.every((hashtag) => hashtagRule.test(hashtag));
};

pristine.addValidator(
  inputHashtag,
  isEveryHashtagValid,
  'Введён невалидный хэш-тег'
);

const isEveryHasgtagUnique = (value) => {
  const arrayHashtags = getHashtagsArray(value);
  const arrayNormaliseHashtags = arrayHashtags.map((hashtag) => hashtag.toLowerCase());
  return arrayNormaliseHashtags.every((hashtag) => arrayNormaliseHashtags.indexOf(hashtag) === arrayNormaliseHashtags.lastIndexOf(hashtag));
};

pristine.addValidator(
  inputHashtag,
  isEveryHasgtagUnique,
  'Хеш-теги не должны повторяться',
);

const isHashtagAmountValid = (value) => {
  const arrayHashtags = getHashtagsArray(value);
  return arrayHashtags.length <= MAX_NUMBER_HASHTAGS;
};

pristine.addValidator(
  inputHashtag,
  isHashtagAmountValid,
  `Максимум ${MAX_NUMBER_HASHTAGS} хештегов`,
);

const isDescriptionValid = (value) => value.length <= MAX_LENGTH_COMMENT;

pristine.addValidator(
  inputComment,
  isDescriptionValid,
  `Максимальная длина сообщения ${MAX_LENGTH_COMMENT} символов`
);

const blockButtonSubmit = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = ButtonSubmitText.SENDING;
};

const unblockButtonSubmit = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = ButtonSubmitText.IDLE;
};

const setFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockButtonSubmit();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          showMessage('success');
          document.addEventListener('keydown', onEscapePress);
        })
        .catch(
          () => {
            showMessage('error');
            document.addEventListener('keydown', onEscapePress);
          }
        )
        .finally(unblockButtonSubmit);
    }
  });
};

export {
  setFormSubmit
};