/* eslint-disable no-undef */

// Get the link and button
const link = document.querySelector('#link');
const button = document.querySelector('.copy');

// Set the link text to be the url. the slice() method gets rid
// of the unnecesary /links parameter that gets passed
link.value = `https://links.juangarcia.design${window.location.hash.slice(7)}`;

// Event to copy the content on the clipboard
button.addEventListener('click', () => {
  link.select();
  document.execCommand('copy');

  const tooltip = document.querySelector('#tooltip');
  tooltip.innerHTML = 'Copied to clipboard!';
});

// Event to open the link in new tab if clicking on the url
link.addEventListener('click', () => {
  window.open(link.value, '_blank');
  window.focus();
});
