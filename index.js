/* eslint-disable linebreak-style */
// import UI from "/modules/UI.js";
// import Store from "/modules/Store.js";



// Book Class : Represents a Book
export default class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const StoredBooks = Store.getbooks();

    const books = StoredBooks;

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.getElementById('book-list');

    const row = document.createElement('tr');
    row.classList.add('wrapper-book');
    row.innerHTML = `
    <td class="book-title">${book.title}</td>
    <td class="book-author">by ${book.author}</td>
    <td class="button-delete"><a href="#" class="btn btn-danger btn-sm  delete">delete</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    // Vanish in 2 seconds

    setTimeout(() => document.querySelector('.alert').remove(), 2000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}


// Store Class : Handles Local Storage
class Store {
  static getbooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getbooks();
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Store.getbooks();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
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

  // Show sucess message
  UI.showAlert('Book Removed', 'success');
});

// Add date
document.getElementById('date').innerText += `${new Date()}`;

// Add active link color

const activePage = window.location.pathname;
document.querySelectorAll('nav a')
  . forEach((link) => {
    if (link.href.includes(`${activePage}`)) {
      link.classList.add('active');
    }
  });
 