import {uploadFile, imageEditingMode, buttonClose, inputHashtag, inputComment, inputScale} from './dom-elements.js';
import { SCALE_VALUE_MAXIMUM } from '../constants.js';
import {isEscapeKey} from '../util.js';
import {setFormSubmit} from './validation.js';
import {addEventsButtonsZoom, removeEventsButtonsZoom} from './scale.js';
import {addEventsEffects, removeEventsEffects} from './effects.js';

const SCALE_VALUE_BASE = SCALE_VALUE_MAXIMUM;

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
  inputScale.value = SCALE_VALUE_BASE;
  document.querySelector('.effects__radio[value = "none"]').checked = true;
};

function closeEditingMode () {
  imageEditingMode.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  removeEventsButtonsZoom();
  removeEventsEffects();
  resetForm();
  buttonClose.removeEventListener('click', closeEditingMode);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const openEditingMode = () => {
  imageEditingMode.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  addEventsButtonsZoom();
  addEventsEffects();
  buttonClose.addEventListener('click', closeEditingMode);
  document.addEventListener('keydown', onDocumentKeydown);
};


setFormSubmit(closeEditingMode);
uploadFile.addEventListener('change', openEditingMode);


