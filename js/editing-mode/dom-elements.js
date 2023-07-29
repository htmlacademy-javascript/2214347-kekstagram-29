// DOM-элементы
const form = document.querySelector('.img-upload__form'); // форма
const uploadFile = form.querySelector('.img-upload__input'); // инпут загрузки изображения
const imageEditingMode = form.querySelector('.img-upload__overlay'); // модальное окно редактирования изображения
const buttonClose = form.querySelector('.img-upload__cancel'); // кнопка закрытия модального окна
const inputHashtag = form.querySelector('.text__hashtags'); // инпут хеш-тегов
const inputComment = form.querySelector('.text__description'); // инпут комментов
const buttonZoomIn = form.querySelector('.scale__control--bigger'); //кнопка увеличения масштаба
const buttonZoomOut = form.querySelector('.scale__control--smaller'); //кнопка уменьшения масштаба
const inputScale = form.querySelector('input.scale__control'); //поле масштаба
const imagePreview = form.querySelector('.img-upload__preview img'); //редактируемое фото
const slider = form.querySelector('.effect-level__slider'); // слайдер
const sliderContainer = form.querySelector('.img-upload__effect-level'); // контейнер слайдера
const effectLevelValue = form.querySelector('.effect-level__value'); // поле для значения эффекта фото
const buttonSubmit = form.querySelector('#upload-submit'); // кнопка отправки данных на сервер
const effectsPreviews = form.querySelectorAll('.effects__preview'); // массив превью фото с наложенны эффектом
const modalSuccessTemplate = document.querySelector('#success').content.querySelector('.success'); // шаблон успеха
const modalErrorTemplate = document.querySelector('#error').content.querySelector('.error'); // шаблон провала


export {
  form,
  uploadFile,
  imageEditingMode,
  buttonClose,
  inputHashtag,
  inputComment,
  buttonZoomIn,
  buttonZoomOut,
  inputScale,
  imagePreview,
  slider,
  sliderContainer,
  effectLevelValue,
  buttonSubmit,
  effectsPreviews,
  modalSuccessTemplate,
  modalErrorTemplate
};
