(function () {
  // Counter in localStorage
  const KEY = "reviewCount";
  const current = parseInt(localStorage.getItem(KEY) || "0", 10);
  const next = current + 1;
  localStorage.setItem(KEY, String(next));

  const countEl = document.getElementById("reviewCount");
  if (countEl) countEl.textContent = String(next);

  // Build summary from query string
  const params = new URLSearchParams(window.location.search);

  const summaryPairs = [
    ["Product", params.get("product") || "—"],
    ["Rating", params.get("rating") || "—"],
    ["Installed", params.get("installed") || "—"],
    ["Features", (params.getAll("features") || []).join(", ") || "—"],
    ["Review", params.get("notes") || "—"],
    ["Name", params.get("user") || "—"],
  ];

  const dl = document.getElementById("summary");
  if (dl) {
    dl.innerHTML = "";
    summaryPairs.forEach(([term, val]) => {
      const dt = document.createElement("dt");
      dt.textContent = term;
      const dd = document.createElement("dd");
      dd.textContent = val;
      dl.appendChild(dt);
      dl.appendChild(dd);
    });
  }

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
``;
