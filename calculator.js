// FR-08: Calculator key grid with input validation and divide-by-zero protection.
document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("calcDisplay");
  if (!display) return;
  document.querySelectorAll("[data-calc]").forEach(button => {
    button.addEventListener("click", () => {
      const key = button.dataset.calc;
      if (key === "C") display.value = "";
      else if (key === "DEL") display.value = display.value.slice(0, -1);
      else if (key === "=") calculate();
      else display.value += key;
    });
  });
  function calculate() {
    const expression = display.value.trim();
    if (!expression || !/^[0-9+\-*/.() ]+$/.test(expression)) {
      display.value = "Error";
      return;
    }
    try {
      const result = Function('"use strict"; return (' + expression + ')')();
      if (!Number.isFinite(result)) throw new Error("Invalid result");
      display.value = String(Number(result.toFixed(8)));
    } catch {
      display.value = "Error";
    }
  }
});
