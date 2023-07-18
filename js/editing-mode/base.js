import {uploadFile, imageEditingMode, buttonClose, inputHashtag, inputComment} from './dom-elements.js';
import {isEscapeKey} from '../util.js';
import {addEventFormSubmit, removeEventFormSubmit} from './validation.js';
import {addEventsButtonsZoom, removeEventsButtonsZoom} from './scale.js';
import {addEventsEffects, removeEventsEffects} from './effects.js';

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
  removeEventFormSubmit();
  removeEventsButtonsZoom();
  removeEventsEffects();
  resetForm();
  buttonClose.removeEventListener('click', closeEditingMode);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const openEditingMode = () => {
  imageEditingMode.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  addEventFormSubmit();
  addEventsButtonsZoom();
  addEventsEffects();
  buttonClose.addEventListener('click', closeEditingMode);
  document.addEventListener('keydown', onDocumentKeydown);
};

uploadFile.addEventListener('change', openEditingMode);


