// FR-07: Global light/dark theme with localStorage persistence.
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const buttons = document.querySelectorAll(".theme-toggle");
  const savedTheme = localStorage.getItem("libraDeskTheme") || "light";
  root.dataset.theme = savedTheme;
  function updateButton() {
    buttons.forEach(button => {
      button.textContent = root.dataset.theme === "dark" ? "☀️" : "🌙";
      button.setAttribute("aria-label", root.dataset.theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    });
  }
  updateButton();
  buttons.forEach(button => button.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("libraDeskTheme", root.dataset.theme);
    updateButton();
  }));

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.textContent = open ? "✕" : "☰";
    });
  }
});
