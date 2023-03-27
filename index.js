// Get the saved data from localStorage or create an empty array
const storeData = JSON.parse(localStorage.getItem('Added Books')) || [];
// Add the books to the HTML
function addBooks(books) {
  // Use the map function to iterate over each book and create HTML elements
  return books.map((book, index) => `
       <p>${book.title}</p>
       <p>${book.author}</p>
       <button class="remove" data-index="${index}" type="button">Remove</button>
       <hr>
     `).join('');
}

// Display the books on the webpage
function displayBooks() {
  const container = document.querySelector('.container');
  const div = document.createElement('div');
  div.classList.add('book-list');
  div.innerHTML = addBooks(storeData);
  container.innerHTML = '';
  container.appendChild(div);
}
// Save the data to localStorage
function updateData() {
  localStorage.setItem('Added Books', JSON.stringify(storeData));
}

// Remove a book from the storeData array
function removeBook(index) {
  storeData.splice(index, 1);
  updateData();
  displayBooks();
}

// Defining addNewBook function
function addNewBook(title, author) {
  // Create a new book object
  const newBook = {
    title,
    author,
  };
  // Add the new book to the storeData array
  storeData.push(newBook);

  // Update the data in localStorage and display the books
  updateData();
  displayBooks();
}

// Add an event listener to the remove button
const container = document.querySelector('.container');
container.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    const { index } = event.target.dataset;
    removeBook(index);
  }
});

// Add an event listener to the form submit button
const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.querySelector('.title').value;
  const author = document.querySelector('.author').value;
  addNewBook(title, author);
  form.reset();
});

// Display the books when the page loads
displayBooks();