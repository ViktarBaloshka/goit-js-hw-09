// Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона < body > на
// случайное значение используя инлайн стиль.При нажатии на кнопку «Stop», изменение цвета фона
// должно останавливаться.

// ВНИМАНИЕ
// Учти, на кнопку «Start» можно нажать бесконечное количество раз.Сделай так, чтобы пока
// изменение темы запушено, кнопка «Start» была не активна(disabled).

// Для генерации случайного цвета используй функцию getRandomHexColor.

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let isActive = true;
let DELAY = 1000;
let timeoutId = null;

btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onStart() {
  btnStart.disabled = isActive;
  btnStop.disabled = !isActive;
  timeoutId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, DELAY);
}

function onStop() {
  clearTimeout(timeoutId);
  btnStop.disabled = isActive;
  btnStart.disabled = !isActive;
}
