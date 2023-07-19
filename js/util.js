function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function getCommentMessage (array, maxNumbersOfSentences) {
  const commentMessage = [];
  const count = getRandomInteger(1,maxNumbersOfSentences);
  for (let i = 0; i < count; i++) {
    let currentCommentMessage = getRandomArrayElement(array);
    if (commentMessage.length >= array.length) {
      return null;
    }
    while (commentMessage.includes(currentCommentMessage)) {
      currentCommentMessage = getRandomArrayElement(array);
    }
    commentMessage.push(currentCommentMessage);
  }
  return commentMessage.join(' ');
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const getEffectSliderOptions = (effect) => {
  switch (effect) {
    case 'chrome':
      return {
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      };
    case 'sepia':
      return {
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      };
    case 'marvin':
      return {
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      };
    case 'phobos':
      return {
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      };
    case 'heat':
      return {
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      };
  }
};

const getEffecFiltertOption = (effect, input) => {
  switch (effect) {
    case 'chrome':
      return `grayscale(${input.value})`;
    case 'sepia':
      return `sepia(${input.value})`;
    case 'marvin':
      return `invert(${input.value}%)`;
    case 'phobos':
      return `blur(${input.value}px)`;
    case 'heat':
      return `brightness(${input.value})`;
  }
};

export {getRandomArrayElement, getRandomInteger, createRandomIdFromRangeGenerator, getCommentMessage, isEscapeKey, getEffectSliderOptions, getEffecFiltertOption};
