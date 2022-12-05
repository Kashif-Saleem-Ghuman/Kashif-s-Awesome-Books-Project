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