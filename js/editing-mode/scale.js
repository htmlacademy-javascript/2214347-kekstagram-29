import {STEP_SCALE, SCALE_VALUE_MAXIMUM, SCALE_VALUE_MINIMUM} from '../constants.js';
import {inputScale, imagePreview, buttonZoomIn, buttonZoomOut} from './dom-elements.js';

const arrayInputScale = inputScale.value.split('%');
arrayInputScale[1] = '%';

const zoomIn = () => {
  if (inputScale.value !== SCALE_VALUE_MAXIMUM) {
    arrayInputScale[0] += STEP_SCALE;
    imagePreview.style.scale = arrayInputScale[0] / 100;
    inputScale.value = arrayInputScale.join('');
  }
};

const zoomOut = () => {
  if (inputScale.value !== SCALE_VALUE_MINIMUM) {
    arrayInputScale[0] -= STEP_SCALE;
    imagePreview.style.scale = arrayInputScale[0] / 100;
    inputScale.value = arrayInputScale.join('');
  }
};

const addEventsButtonsZoom = () => {
  buttonZoomIn.addEventListener('click', zoomIn);
  buttonZoomOut.addEventListener('click', zoomOut);
};

const removeEventsButtonsZoom = () => {
  buttonZoomIn.removeEventListener('click', zoomIn);
  buttonZoomOut.removeEventListener('click', zoomOut);
};

export {addEventsButtonsZoom, removeEventsButtonsZoom};
