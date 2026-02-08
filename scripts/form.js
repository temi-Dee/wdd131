document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("productName");
  const dateInput = document.getElementById("installDate");
  const yearEl = document.getElementById("year");

  // Populate select options from PRODUCTS array
  const data = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
  data.forEach(({ id, name }) => {
    const opt = document.createElement("option");
    // Assignment states: each option value must be the product name
    opt.value = name;
    opt.textContent = name;
    // If your instructor wants ID in value, switch:
    // opt.value = id; opt.textContent = name;
    select.appendChild(opt);
  });

  // Prevent selecting a future installation date
  const today = new Date().toISOString().slice(0, 10);
  dateInput.setAttribute("max", today);

  // Footer year
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
