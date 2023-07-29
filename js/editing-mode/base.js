import {uploadFile, imageEditingMode, buttonClose, inputHashtag, inputComment, inputScale, imagePreview, effectsPreviews, buttonSubmit, form} from './dom-elements.js';
import { SCALE_VALUE_MAXIMUM, ACCEPTABLE_FILE_TYPES } from '../constants.js';
import {isEscapeKey} from '../util.js';
import {resetValidator, pristine} from './validation.js';
import {addEventsButtonsZoom, removeEventsButtonsZoom} from './scale.js';
import {addEventsEffects, removeEventsEffects} from './effects.js';
import { sendData } from '../api.js';
import { showMessage } from './messages.js';

const SCALE_VALUE_BASE = SCALE_VALUE_MAXIMUM;

const ButtonSubmitText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const blockButtonSubmit = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = ButtonSubmitText.SENDING;
};

const unblockButtonSubmit = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = ButtonSubmitText.IDLE;
};

const onDocumentKeydown = (evt) => {
  if (inputHashtag !== document.activeElement && inputComment !== document.activeElement) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeEditingMode();
    }
  }
};

const resetEditingMode = () => {
  inputHashtag.value = '';
  inputComment.value = '';
  uploadFile.value = '';
  inputScale.value = SCALE_VALUE_BASE;
  document.querySelector('.effects__radio[value = "none"]').checked = true;
  resetValidator();
};

const onButtonCloseClick = () => closeEditingMode();

function closeEditingMode () {
  imageEditingMode.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  removeEventsButtonsZoom();
  removeEventsEffects();
  resetEditingMode();
  buttonClose.removeEventListener('click', onButtonCloseClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const openEditingMode = () => {
  imageEditingMode.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  addEventsButtonsZoom();
  addEventsEffects();
  buttonClose.addEventListener('click', onButtonCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showUploadFile = () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const isNameAcceptable = ACCEPTABLE_FILE_TYPES.some((type) => fileName.endsWith(type));
  if(isNameAcceptable) {
    imagePreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url(${imagePreview.src})`;
    });
  }
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
        })
        .catch(
          () => {
            showMessage('error');
            document.removeEventListener('keydown', onDocumentKeydown);
          }
        )
        .finally(() => {
          unblockButtonSubmit();
        });
    }
  });
};

uploadFile.addEventListener('change', () => {
  openEditingMode();
  showUploadFile();
});

export {setFormSubmit, closeEditingMode};


