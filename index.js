// Get the saved data from localStorage or create an empty array
let storeData = JSON.parse(localStorage.getItem('Added Books')) || [];

// Add an event listener to the form submit button
const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.querySelector('.title').value;
  const author = document.querySelector('.author').value;
  addNewBook(title, author);
  form.reset();
});
