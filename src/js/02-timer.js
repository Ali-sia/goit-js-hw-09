import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

let userDate = null;

class Timer {
  constructor() {
    this.isActive = false;
    this.timerId = null;
  }
  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.timerId = setInterval(() => {
      const currentDate = new Date();
      const deltaTime = Date.parse(userDate) - currentDate;
      const covertedDateDifference = convertMs(deltaTime);

      refs.timerSeconds.textContent = covertedDateDifference.seconds;
      refs.timerMinutes.textContent = covertedDateDifference.minutes;
      refs.timerHours.textContent = covertedDateDifference.hours;
      refs.timerDays.textContent = covertedDateDifference.days;

      if (deltaTime <= 0) {
        this.stop();
        // window.alert('Time is over!');
        // Notify.success('Time is over!');
        Report.success('Success', 'Time is over!', 'Okay');
        return;
      }
    });
  }
  stop() {
    clearInterval(this.timerId);
    this.isActive = false;
    refs.timerSeconds.textContent = '00';
    refs.timerMinutes.textContent = '00';
    refs.timerHours.textContent = '00';
    refs.timerDays.textContent = '00';
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      refs.startBtn.disabled = false;
      userDate = selectedDates[0];
    } else {
      // window.alert('Please, choose a date in the future');
      // Notify.failure('Please, choose a date in the future');
      Report.failure('Failure', 'Please, choose a date in the future', 'Okay');
    }
  },
};

const timer = new Timer();
refs.startBtn.addEventListener('click', () => timer.start());

flatpickr('#datetime-picker', options);
// Notiflix.Notify.init({ width: '300px', position: 'center' });

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
