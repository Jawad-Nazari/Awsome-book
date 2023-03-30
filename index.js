import Book from './list.js';

const date = new Date();
document.getElementById('currentTime').innerHTML = date.toUTCString();

class BookList {
  constructor() {
    this.storeData = JSON.parse(localStorage.getItem('Added Books')) || [];
    this.container = document.querySelector('.book-list');
    this.form = document.getElementById('form');
    this.form.addEventListener('submit', this.addNewBook.bind(this));
    this.container.addEventListener('click', this.removeBook.bind(this));

    this.bookLink = document.getElementById('booksLink');
    this.addBooksLink = document.getElementById('addNewBook');
    this.contactLink = document.getElementById('contactLink');
    this.booksSection = document.getElementById('books');
    this.addBookSection = document.getElementById('addingBook');
    this.contactSection = document.getElementById('contact');

    this.bookLink.addEventListener('click', () => this.showBooksSection());
    this.addBooksLink.addEventListener('click', () => this.showAddBookSection());
    this.contactLink.addEventListener('click', () => this.showContactSection());

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
      const { index } = event.target.dataset;
      this.storeData.splice(index, 1);
      this.updateData();
      this.displayBooks();
    }
  }

  showBooksSection() {
    this.bookLink.classList.add('active');
    this.addBooksLink.classList.remove('active');
    this.contactLink.classList.remove('active');
    this.booksSection.style.display = 'block';
    this.addBookSection.style.display = 'none';
    this.contactSection.style.display = 'none';
    this.booksSection.style.display = 'flex';
    this.booksSection.style.justifyContent = 'center';
  }

  showAddBookSection() {
    this.bookLink.classList.remove('active');
    this.addBooksLink.classList.add('active');
    this.contactLink.classList.remove('active');
    this.booksSection.style.display = 'none';
    this.addBookSection.style.display = 'block';
    this.contactSection.style.display = 'none';
    this.addBookSection.style.display = 'flex';
    this.addBookSection.style.justifyContent = 'center';
  }

  showContactSection() {
    this.bookLink.classList.remove('active');
    this.addBooksLink.classList.remove('active');
    this.contactLink.classList.add('active');
    this.booksSection.style.display = 'none';
    this.addBookSection.style.display = 'none';
    this.contactSection.style.display = 'block';
  }

  addBookHtml() {
    return this.storeData.map((book, index) => `
      <div class="book-list-book">
        <p>" ${book.title}"  by  ${book.author} </p>
        <button class="remove" data-index="${index}" type="button">Remove</button>
      </div>
    `).join('');
  }

  displayBooks() {
    const div = document.createElement('div');
    div.innerHTML = this.addBookHtml();
    this.container.innerHTML = '';
    this.container.appendChild(div);
  }

  updateData() {
    localStorage.setItem('Added Books', JSON.stringify(this.storeData));
  }
}

const bookList = new BookList();
bookList();