let timeoutId = null;
const DELAY = 1000;

let isActive = true;

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener('click', onStartChangeColor);
btnStop.addEventListener('click', onStopChangeColor);

function onStartChangeColor() {
  btnStart.disabled = isActive;
  btnStop.disabled = !isActive;
  timeoutId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, DELAY);
  console.log(isActive);
}

function onStopChangeColor() {
  clearInterval(timeoutId);
  btnStart.disabled = !isActive;
  btnStop.disabled = isActive;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
