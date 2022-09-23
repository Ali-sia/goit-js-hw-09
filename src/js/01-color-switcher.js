const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

const changeBodyBackground = {
  changeColorID: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.changeColorID = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  },
  stop() {
    clearInterval(this.changeColorID);
    this.isActive = false;
  },
};

refs.startBtn.addEventListener('click', () => {
  changeBodyBackground.start();
});
refs.stopBtn.addEventListener('click', () => {
  changeBodyBackground.stop();
});

// let changeColorID = null;
// let isActive = false;

// refs.startBtn.addEventListener('click', (onStartColorChange));
// refs.stopBtn.addEventListener('click', onStopColorChange);

// function onStartColorChange() {

//   if (isActive) {
//     return;
//   }

//   isActive = true;

//   changeColorID = setInterval(() => {
//     refs.body.style.backgroundColor = getRandomHexColor();
//   }, 1000);
// }

// function onStopColorChange() {
//   console.log('stop');
//   isActive = false;
//   clearInterval(changeColorID);
// }

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
