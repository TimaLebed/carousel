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
