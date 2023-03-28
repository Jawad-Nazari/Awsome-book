class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookList {
  constructor() {
    this.storeData = JSON.parse(localStorage.getItem('Added Books')) || [];
    this.container = document.querySelector('.container');
    this.form = document.getElementById('form');
    this.form.addEventListener('submit', this.addNewBook.bind(this));
    this.container.addEventListener('click', this.removeBook.bind(this));
    this.displayBooks();
  }

  addNewBook(event) {
    event.preventDefault();
    const title = document.querySelector('.title').value;
    const author = document.querySelector('.author').value;
    const newBook = new Book(title, author);
    this.storeData.push(newBook);
    this.updateData();
    this.displayBooks();
    this.form.reset();
  }

  removeBook(event) {
    if (event.target.classList.contains('remove')) {
      const index = event.target.dataset.index;
      this.storeData.splice(index, 1);
      this.updateData();
      this.displayBooks();
    }
  }

  addBooks() {
    return this.storeData.map((book, index) => `
      <p>${book.title}</p>
      <p>${book.author}</p>
      <button class="remove" data-index="${index}" type="button">Remove</button>
      <hr>
    `).join('');
  }

  displayBooks() {
    const div = document.createElement('div');
    div.classList.add('book-list');
    div.innerHTML = this.addBooks();
    this.container.innerHTML = '';
    this.container.appendChild(div);
  }

  updateData() {
    localStorage.setItem('Added Books', JSON.stringify(this.storeData));
  }
}

const bookList = new BookList();
