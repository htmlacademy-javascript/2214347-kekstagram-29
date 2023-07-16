// 1. Функция для проверки длины строки.

const checkStringSize = (verifiableString, maximumLength) => (maximumLength >= verifiableString.length);

// Проверка работоспособности функции:
// Cтрока короче 20 символов
checkStringSize('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringSize('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringSize('проверяемая строка', 10); // false

// 2. Функция для проверки, является ли строка палиндромом.

function isPalindrome (verifiableString) {
  const normalizedString = verifiableString.replaceAll(' ','').toLowerCase();
  let invertedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    invertedString += normalizedString[i];
  }
  return (normalizedString === invertedString);
}

// Проверка работоспособности функции:
// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл '); // true


// 3. Функция для извлечения цифр из строки.

function extractionNumber (verifiableString) {
  verifiableString = String(verifiableString); // если передаётся число в функцию
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

// 4. Функция для определения возможности проведения встречи.

function getTimeInMinutes (time) {
  const parts = time.split(':').map(Number);
  const [hours, minutes] = parts;
  const minutesPerHour = 60;

  return hours * minutesPerHour + minutes;
}

function isMeetingPossible (timeStart, timeEnd, meetingTimeStart, meetingDuration) {
  const timeMeeting = getTimeInMinutes(meetingTimeStart) + meetingDuration;
  return getTimeInMinutes(timeStart) <= timeMeeting && timeMeeting <= getTimeInMinutes(timeEnd);
}

// Проверка работоспособности
isMeetingPossible('08:00', '17:30', '14:00', 90); // Ожидаю "true"
isMeetingPossible('8:0', '10:0', '8:0', 120); // Ожидаю "true"
isMeetingPossible('08:00', '14:30', '14:00', 90); // Ожидаю "false"
isMeetingPossible('14:00', '17:30', '08:0', 90); // Ожидаю "false"
isMeetingPossible('8:00', '17:30', '08:00', 900); // Ожидаю "false"
