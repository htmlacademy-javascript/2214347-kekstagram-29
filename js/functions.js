/*
Разные вариации функции для проверки длины строки.
*/

// 1. Функция с помощью условий if и оператора return:

// function checkStringSize (verifiableString, maximumLength) {
//   if (maximumLength >= verifiableString.length) return true;
//   return false;
// }

// 2. Функция с помощью тернарного оператора:

// function checkStringSize (verifiableString, maximumLength) {
//   return (maximumLength >= verifiableString.length);
// }

// 3. Стрелочная функция с тернарным оператором:

const checkStringSize = (verifiableString, maximumLength) => (maximumLength >= verifiableString.length);

// Проверка работоспособности функции:
// Cтрока короче 20 символов
checkStringSize('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringSize('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringSize('проверяемая строка', 10); // false


/*
Разные вариации функции для проверки, является ли строка палиндромом.
*/

// 1. Функция с помощью цикла while и тернарного оператора:

// function checkStringPalindrome (verifiableString) {
//   const normalizedString = verifiableString.replaceAll(' ','').toLowerCase();
//   let invertedString = '';
//   let i = normalizedString.length - 1;
//   while (i >= 0) {
//     invertedString += normalizedString[i];
//     i--;
//   }
//   return (normalizedString === invertedString);
// }

// 2. Функция с помощью цикла for и тернарного оператора:

function checkStringPalindrome (verifiableString) {
  const normalizedString = verifiableString.replaceAll(' ','').toLowerCase();
  let invertedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    invertedString += normalizedString[i];
  }
  return (normalizedString === invertedString);
}

// Проверка работоспособности функции:
// Строка является палиндромом
checkStringPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
checkStringPalindrome('ДовОд'); // true
// Это не палиндром
checkStringPalindrome('Кекс'); // false
// Это палиндром
checkStringPalindrome('Лёша на полке клопа нашёл '); // true


/*
Функция для извлечения цифр из строки.
*/

// 1. Функция с помощью цикла for и условий if:

function extractionNumber (verifiableString) {
  verifiableString = String(verifiableString);
  let stringSymbolToNumber;
  let result = '';
  for (let i = 0; i <= verifiableString.length; i++) {
    stringSymbolToNumber = parseInt(verifiableString[i], 10);
    if (!Number.isNaN(stringSymbolToNumber)) {
      result += stringSymbolToNumber;
    }
  }
  return parseInt(result, 10);
}

// Проверка работоспособности функции:
// Тест №1
extractionNumber('2023 год'); // 2023
// Тест №2
extractionNumber('ECMAScript 2022'); // 2022
// Тест №3
extractionNumber('1 кефир, 0.5 батона'); // 105
// Тест №4
extractionNumber('агент 007'); // 7
// Тест №5
extractionNumber('а я томат'); // NaN
// Тест №6
extractionNumber(2023); // 2023
// Тест №7
extractionNumber(-1); // 1
// Тест №8
extractionNumber(1.5); // 15
// Тест №9
extractionNumber(''); // NaN
