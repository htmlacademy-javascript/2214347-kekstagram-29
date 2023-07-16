import {isEscapeKey} from './util.js';
// Константы
const form = document.querySelector('.img-upload__form'); // форма
const uploadFile = form.querySelector('.img-upload__input'); // инпут загрузки изображения
const imageEditingMode = form.querySelector('.img-upload__overlay'); // модальное окно редактирования изображения
const buttonClose = form.querySelector('.img-upload__cancel'); // кнопка закрытия модального окна
const inputHashtag = form.querySelector('.text__hashtags'); // инпут хеш-тегов
const inputComment = form.querySelector('.text__description'); // инпут комментов


const onDocumentKeydown = (evt) => {
  if (inputHashtag !== document.activeElement && inputComment !== document.activeElement) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeEditingMode();
    }
  }
};

const resetForm = () => {
  inputHashtag.value = '';
  inputComment.value = '';
  uploadFile.value = '';
};

function closeEditingMode () {
  imageEditingMode.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  resetForm();
  buttonClose.removeEventListener('click', closeEditingMode);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const openEditingMode = () => {
  imageEditingMode.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  buttonClose.addEventListener('click', closeEditingMode);
  document.addEventListener('keydown', onDocumentKeydown);
};

uploadFile.addEventListener('change', openEditingMode);

export {form, inputHashtag, inputComment};
