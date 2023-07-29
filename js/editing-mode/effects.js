import {effectLevelValue, slider, form, sliderContainer, imagePreview} from './dom-elements.js';
import {getEffectSliderOptions, getEffecFiltertOption} from '../util.js';

effectLevelValue.value = 0;

noUiSlider.create(slider, {
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
        return value.toFixed(2);
      }
      return value.toFixed(2);
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
    slider.noUiSlider.updateOptions(getEffectSliderOptions(activeEffectValue));
  }
};

const onPreviewChanging = () => {
  effectLevelValue.value = slider.noUiSlider.get();
  imagePreview.style.filter = getEffecFiltertOption(activeEffectValue, effectLevelValue);
};

const addEventsEffects = () => {
  form.addEventListener('change', onSliderChanging);
  slider.noUiSlider.on('update', onPreviewChanging);
};

const removeEventsEffects = () => {
  form.removeEventListener('change', onSliderChanging);
  slider.noUiSlider.off('update', onPreviewChanging);
};

export {addEventsEffects, removeEventsEffects};
