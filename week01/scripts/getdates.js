const yearSpan = document.getElementById("year");
const lastModified = document.getElementById("lastModified");

yearSpan.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;
