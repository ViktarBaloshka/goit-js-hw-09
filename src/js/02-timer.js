import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

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
  btnStartTime: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  inputEl: document.querySelector('#datetime-picker'),
};

const fl = flatpickr(refs.inputEl, options);

let selectedDate = Date.now();
let isActive = true;

refs.btnStartTime.disabled = isActive;
refs.btnStartTime.addEventListener('click', onStartClick);

function onCloseFunction(date) {
  if (Date.now() > date) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    refs.btnStartTime.disabled = !isActive;
    selectedDate = date;
  }
}

function onStartClick() {
  refs.btnStartTime.disabled = isActive;
  fl.destroy();
  refs.inputEl.disabled = isActive;
  calculationStart();
}

function calculationStart() {
  setInterval(() => {
    const time = convertMs(selectedDate - Date.now());
    addZero(time);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function addZero({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
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
