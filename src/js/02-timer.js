import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onCloseFunction(selectedDates[0]);
  },
};

const refs = {
  timeSet: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  inputDay: document.querySelector('[data-days]'),
  inputHours: document.querySelector('[data-hours]'),
  inputMinutes: document.querySelector('[data-minutes]'),
  inputSeconds: document.querySelector('[data-seconds]'),
};

let isActive = true;
let selectedDate = Date.now();
const time = convertMs(selectedDate - Date.now());
const fltpckr = flatpickr(refs.timeSet, options);

refs.btnStart.addEventListener('click', onClickStart);

function onCloseFunction(date) {
  if (Date.now() > date) {
    window.alert('Please choose a date in the future');
  } else {
    refs.btnStart.disabled = !isActive;
    selectedDate = date;
    refs.timeSet.disabled = !isActive;
  }
}

function onClickStart() {
  refs.btnStart.disabled = isActive;
  fltpckr.destroy();
  setInterval(() => {
    updateTime(time);
  }, 1000);
}

function updateTime({ days, hours, minutes, seconds }) {
  refs.inputDay.textContent = addLeadingZero(days);
  refs.inputHours.textContent = addLeadingZero(hours);
  refs.inputMinutes.textContent = addLeadingZero(minutes);
  refs.inputSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
