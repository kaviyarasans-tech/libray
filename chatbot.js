// FR-06: Floating library assistant with keyword-based replies.
document.addEventListener("DOMContentLoaded", () => {
  const fab = document.getElementById("chatFab");
  const panel = document.getElementById("chatPanel");
  if (!fab || !panel) return;
  const log = document.getElementById("chatLog");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");

  fab.addEventListener("click", () => { panel.hidden = !panel.hidden; if (!panel.hidden) input.focus(); });
  document.getElementById("closeChat").addEventListener("click", () => { panel.hidden = true; });

  function addMessage(text, className) {
    const node = document.createElement("div");
    node.className = className;
    node.textContent = text;
    log.appendChild(node);
    log.scrollTop = log.scrollHeight;
  }
  function replyFor(message) {
    const text = message.toLowerCase();
    if (text.includes("add") || text.includes("new book")) return "To add a book, open the Add a book section and enter its title, author, ISBN and category. Then select Save book.";
    if (text.includes("search") || text.includes("find")) return "Use the search box above the catalogue. You can search by title, author, ISBN or category.";
    if (text.includes("issue")) return "Find an available book in the catalogue and select Issue. Its status changes to Issued.";
    if (text.includes("return")) return "Find an issued book and select Return. Its status changes back to Available.";
    if (text.includes("calculator") || text.includes("calculate")) return "The quick calculator is in the right-hand panel. Use the number and operator keys, then press =.";
    if (text.includes("hello") || text.includes("hi")) return "Hello! I can help with adding, searching, issuing and returning books.";
    return "I can help you add a book, search the catalogue, issue a book, return a book or use the calculator.";
  }
  form.addEventListener("submit", event => {
    event.preventDefault();
    const message = input.value.trim();
    if (!message) return;
    addMessage(message, "user-msg");
    addMessage(replyFor(message), "bot-msg");
    input.value = "";
    input.focus();
  });
});
