import {valueElement, sliderElement, form, sliderContainer, imagePreview} from './dom-elements.js';
import {getEffectSliderOptions, getEffecFiltertOption} from '../util.js';

valueElement.value = 0;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

let activeEffectValue; // значение выбранной радио-кнопки

const onSliderChanging = () => {
  activeEffectValue = form.querySelector('.effects__radio:checked').value;

  if (activeEffectValue === 'none') {
    sliderContainer.classList.add('hidden');
    imagePreview.style.filter = 'none';
  } else {
    sliderContainer.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions(getEffectSliderOptions(activeEffectValue));
  }
};

const onPreviewChanging = () => {
  valueElement.value = sliderElement.noUiSlider.get();
  imagePreview.style.filter = getEffecFiltertOption(activeEffectValue, valueElement);
};

const addEventsEffects = () => {
  form.addEventListener('change', onSliderChanging);
  sliderElement.noUiSlider.on('update', onPreviewChanging);
};

const removeEventsEffects = () => {
  form.removeEventListener('change', onSliderChanging);
  sliderElement.noUiSlider.off('update', onPreviewChanging);
};

export {addEventsEffects, removeEventsEffects};