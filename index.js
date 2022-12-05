/* eslint-disable linebreak-style */
import UI from './modules/UI.js';
import Store from './modules/Store.js';

// Book Class : Represents a Book
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Event: Display Books

document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event: Add a Book

document.querySelector('#book-form').addEventListener('submit', (e) => {
  // prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  // Validate
  if (title === '' || author === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instantiate book
    const book = new Book(title, author);

    // Add book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show sucess message
    UI.showAlert('Book Added', 'success');

    // Clear Fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from Store
  Store.removeBook(e.target
    .parentElement.previousElementSibling.previousElementSibling.textContent);
});

// Add date
// document.getElementById('date').innerText += `${new Date()}`;

// Add active link color

const activePage = window.location.pathname;
document.querySelectorAll('nav a')
  . forEach((link) => {
    if (link.href.includes(`${activePage}`)) {
      link.classList.add('active');
    }
  });

// const output = document.getElementById('date');

// output.textContent = DateTime.now().toJSDate();
