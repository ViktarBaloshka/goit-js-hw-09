// Напиши скрипт, который при сабмите формы вызывает функцию createPromise(position, delay) столько раз,
// сколько ввели в поле amount.При каждом вызове передай ей номер создаваемого промиса(position)
// и задержку учитывая введенную пользователем первую задержку(delay) и шаг(step).
// Дополни код функции createPromise так, чтобы она возвращала один промис, который выполянется или
// отклоняется через delay времени.Значением промиса должен быть объект, в котором будут свойства
// position и delay со значениями одноименных параметров.Используй начальный код функции для выбора того,
// что нужно сделать с промисом - выполнить или отклонить.

import Notiflix from 'notiflix';
const refs = {
  delay: document.querySelector('input[name=delay]'),
  step: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
  form: document.querySelector('form'),
};

refs.form = addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  const data = {
    amount: parseInt(refs.amount.value),
    step: parseInt(refs.step.value),
    delay: parseInt(refs.delay.value),
  };
  callPromise(data);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}
function callPromise({ amount, step, delay }) {
  for (let index = 1; index <= amount; index += 1) {
    createPromise(index, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}
