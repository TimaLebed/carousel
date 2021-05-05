import './styles/style.css';

const items = document.querySelectorAll('.item');
const controlLeft = document.querySelector('.control.left');
const controlRight = document.querySelector('.control.right');
let currentItem = 0;
let isEnabled = true;

const changeCurrentItem = (n) => {
  currentItem = (n + items.length) % items.length;
};

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function () {
    this.classList.remove('active', direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add('next', direction);
  items[currentItem].addEventListener('animationend', function () {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  });
}

function previousItem(n) {
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
}

function nextItem(n) {
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
}

controlLeft.addEventListener('click', () => {
  if (isEnabled) previousItem(currentItem);
});

controlRight.addEventListener('click', () => {
  if (isEnabled) nextItem(currentItem);
});

function swipe(item) {
  const surface = item;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let elapsedTime = 0;

  const thresholdX = 150;
  const thresholdY = 75;
  const allowedTime = 300;

  surface.addEventListener('mousedown', (e) => {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });

  surface.addEventListener('mouseup', (e) => {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) > thresholdX && Math.abs(distY) < thresholdY) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else if (isEnabled) {
          nextItem(currentItem);
        }
      }
    }

    e.preventDefault();
    console.log(distX, distY, elapsedTime);
  });
}

const el = document.querySelector('.item-container');

swipe(el);
