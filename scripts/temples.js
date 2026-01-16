/* =========================
   Data: sample temples
   (Use your own images)
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Data
     ========================= */
  const temples = [
    {
      name: "Temple One",
      location: "City, Country",
      dedicated: 1888,
      area: 8500,
      image: "images/temple.webp",
      alt: "Temple One",
    },
    {
      name: "Temple Two",
      location: "City, Country",
      dedicated: 2005,
      area: 98000,
      image: "images/temple.webp",
      alt: "Temple Two",
    },
    {
      name: "Temple Three",
      location: "City, Country",
      dedicated: 1999,
      area: 32000,
      image: "images/temple.webp",
      alt: "Temple Three",
    },
    {
      name: "Temple Four",
      location: "City, Country",
      dedicated: 2018,
      area: 110000,
      image: "images/temple.webp",
      alt: "Temple Four",
    },
    {
      name: "Temple Five",
      location: "City, Country",
      dedicated: 1893,
      area: 12000,
      image: "images/temple.webp",
      alt: "Temple Five",
    },
    {
      name: "Temple Six",
      location: "City, Country",
      dedicated: 2021,
      area: 15000,
      image: "images/temple.webp",
      alt: "Temple Six",
    },
    {
      name: "Temple Seven",
      location: "City, Country",
      dedicated: 1985,
      area: 60000,
      image: "images/temple.webp",
      alt: "Temple Seven",
    },
    {
      name: "Temple Eight",
      location: "City, Country",
      dedicated: 2010,
      area: 8000,
      image: "images/temple.webp",
      alt: "Temple Eight",
    },
    {
      name: "Temple Nine",
      location: "City, Country",
      dedicated: 1905,
      area: 90000,
      image: "images/temple.webp",
      alt: "Temple Nine",
    },
  ];

  /* =========================
     Render helpers
     ========================= */
  const gallery = document.getElementById("gallery");

  function renderGallery(list) {
    gallery.innerHTML = "";
    list.forEach((t) => {
      const fig = document.createElement("figure");
      const img = document.createElement("img");
      const cap = document.createElement("figcaption");

      img.src = t.image;
      img.alt = t.alt || t.name;
      img.loading = "lazy";

      cap.textContent = `${t.name} — ${t.location}`;

      fig.appendChild(img);
      fig.appendChild(cap);
      gallery.appendChild(fig);
    });
  }

  /* =========================
     Filters (respond to user)
     ========================= */
  const FILTERS = {
    home: () => temples,
    old: () => temples.filter((t) => t.dedicated < 1900),
    new: () => temples.filter((t) => t.dedicated >= 2000),
    large: () => temples.filter((t) => t.area >= 90000),
    small: () => temples.filter((t) => t.area < 10000),
  };

  function applyFilter(key) {
    const fn = FILTERS[key] || FILTERS.home;
    renderGallery(fn());
  }

  /* =========================
     Hamburger toggle (mobile)
     ========================= */
  const menuBtn = document.getElementById("menu");
  const nav = document.getElementById("primaryNav");

  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.textContent = isOpen ? "✖" : "☰";
  });

  /* Nav link filtering + close menu on select (mobile) */
  nav.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-filter]");
    if (!a) return;

    e.preventDefault();
    const key = a.getAttribute("data-filter");
    applyFilter(key);

    // Close the menu in mobile after choosing a filter
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰";
    }
  });

  /* =========================
     Footer dates
     ========================= */
  document.getElementById("currentyear").textContent = new Date().getFullYear();

  document.getElementById("lastModified").textContent =
    "Last Modified: " + document.lastModified;

  /* =========================
     Initial render
     ========================= */
  renderGallery(temples);
});
