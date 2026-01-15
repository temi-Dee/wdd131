// Get the current year and insert it into the footer
const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;

// Display the document's last modified date
document.getElementById("lastModified").textContent =
  "Last Modified: " + document.lastModified;
