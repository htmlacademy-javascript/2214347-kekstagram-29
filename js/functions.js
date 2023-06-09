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
console.log('Тест №1. Ожидаю "true", получаю - ', checkStringSize('проверяемая строка', 20));
// Длина строки ровно 18 символов
console.log('Тест №2. Ожидаю "true", получаю - ', checkStringSize('проверяемая строка', 18));
// Строка длиннее 10 символов
console.log('Тест №3. Ожидаю "false", получаю - ', checkStringSize('проверяемая строка', 10));


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
console.log('Тест №1. Ожидаю "true", получаю - ', checkStringPalindrome('топот'));
// Несмотря на разный регистр, тоже палиндром
console.log('Тест №2. Ожидаю "true", получаю - ', checkStringPalindrome('ДовОд'));
// Это не палиндром
console.log('Тест №3. Ожидаю "false", получаю - ', checkStringPalindrome('Кекс'));
// Это палиндром
console.log('Тест №4. Ожидаю "true", получаю - ', checkStringPalindrome('Лёша на полке клопа нашёл '));


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
console.log('Тест №1. Ожидаю 2023, получаю - ', extractionNumber('2023 год'));
// Тест №2
console.log('Тест №2. Ожидаю 2022, получаю - ', extractionNumber('ECMAScript 2022'));
// Тест №3
console.log('Тест №3. Ожидаю 105, получаю - ', extractionNumber('1 кефир, 0.5 батона'));
// Тест №4
console.log('Тест №4. Ожидаю 7, получаю - ', extractionNumber('агент 007'));
// Тест №5
console.log('Тест №5. Ожидаю NaN, получаю - ', extractionNumber('а я томат'));
// Тест №6
console.log('Тест №6. Ожидаю 2023, получаю - ', extractionNumber(2023));
// Тест №7
console.log('Тест №7. Ожидаю 1, получаю - ', extractionNumber(-1));
// Тест №8
console.log('Тест №8. Ожидаю 15, получаю - ', extractionNumber(1.5));
// Тест №9
console.log('Тест №9. Ожидаю NaN, получаю - ', extractionNumber(''));
