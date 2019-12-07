const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');

// eslint-disable-next-line no-undef
form.addEventListener('submit', () => {
  body.classList.add('loading');
  overlay.classList.add('show');
});
