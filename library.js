// Library catalogue: add, search, issue and return books using browser localStorage.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookForm");
  if (!form) return;
  const storageKey = "libraDeskBooks";
  let books = JSON.parse(localStorage.getItem(storageKey) || "[]");
  const rows = document.getElementById("bookRows");
  const empty = document.getElementById("emptyBooks");
  const search = document.getElementById("searchBooks");

  function save() { localStorage.setItem(storageKey, JSON.stringify(books)); render(); }
  function render() {
    const query = search.value.trim().toLowerCase();
    const filtered = books.filter(book => [book.title, book.author, book.isbn, book.category].some(value => value.toLowerCase().includes(query)));
    rows.replaceChildren();
    filtered.forEach(book => {
      const tr = document.createElement("tr");
      const values = [book.title, book.author, book.isbn, book.category];
      values.forEach(value => { const td = document.createElement("td"); td.textContent = value; tr.appendChild(td); });
      const statusCell = document.createElement("td");
      const status = document.createElement("span");
      status.className = "status" + (book.issued ? " issued" : "");
      status.textContent = book.issued ? "Issued" : "Available";
      statusCell.appendChild(status); tr.appendChild(statusCell);
      const actionCell = document.createElement("td");
      const action = document.createElement("button");
      action.className = "table-action";
      action.textContent = book.issued ? "Return" : "Issue";
      action.addEventListener("click", () => {
        book.issued = !book.issued;
        document.getElementById("circulationMessage").textContent = `"${book.title}" is now ${book.issued ? "issued" : "available"}.`;
        save();
      });
      actionCell.appendChild(action); tr.appendChild(actionCell);
      rows.appendChild(tr);
    });
    empty.hidden = filtered.length > 0;
    empty.textContent = books.length === 0 ? "No books yet. Add your first book below." : "No matching books found.";
    document.getElementById("totalBooks").textContent = books.length;
    document.getElementById("availableBooks").textContent = books.filter(book => !book.issued).length;
    document.getElementById("issuedBooks").textContent = books.filter(book => book.issued).length;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("bookAuthor").value.trim();
    const isbn = document.getElementById("bookIsbn").value.trim();
    const category = document.getElementById("bookCategory").value.trim();
    const message = document.getElementById("bookMessage");
    if (!title || !author || !isbn || !category) {
      message.textContent = "Please complete every book field.";
      message.style.color = "var(--danger)";
      return;
    }
    if (books.some(book => book.isbn.toLowerCase() === isbn.toLowerCase())) {
      message.textContent = "That ISBN / Book ID already exists.";
      message.style.color = "var(--danger)";
      return;
    }
    books.push({ id: Date.now(), title, author, isbn, category, issued: false });
    save();
    form.reset();
    message.textContent = "Book added successfully.";
    message.style.color = "var(--success)";
  });
  search.addEventListener("input", render);
  render();
});
