// Grab the select and form item
const select = document.querySelector('select');
const form = document.querySelector('form');

// Event to dinamically change the form action based on the select change
select.addEventListener('change', (e) => {
  form.setAttribute('action', `/links/${e.target.value}`);
});
