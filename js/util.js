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

export {getRandomArrayElement, getRandomInteger, createRandomIdFromRangeGenerator, getCommentMessage};
