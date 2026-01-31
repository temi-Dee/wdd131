document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Data (provided + 3 more)
     ========================= */
  const temples = [
    {
      templeName: "Aba Nigeria",
      location: "Aba, Nigeria",
      dedicated: "2005, August, 7",
      area: 11500,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
    },
    {
      templeName: "Manti Utah",
      location: "Manti, Utah, United States",
      dedicated: "1888, May, 21",
      area: 74792,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
    },
    {
      templeName: "Payson Utah",
      location: "Payson, Utah, United States",
      dedicated: "2015, June, 7",
      area: 96630,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
    },
    {
      templeName: "Yigo Guam",
      location: "Yigo, Guam",
      dedicated: "2020, May, 2",
      area: 6861,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
    },
    {
      templeName: "Washington D.C.",
      location: "Kensington, Maryland, United States",
      dedicated: "1974, November, 19",
      area: 156558,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
    },
    {
      templeName: "Lima Perú",
      location: "Lima, Perú",
      dedicated: "1986, January, 10",
      area: 9600,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
    },
    {
      templeName: "Mexico City Mexico",
      location: "Mexico City, Mexico",
      dedicated: "1983, December, 2",
      area: 116642,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
    },

    // --- Added 3+ more ---
    {
      templeName: "Accra Ghana",
      location: "Accra, Ghana",
      dedicated: "2004, January, 11",
      area: 17500,
      imageUrl: "images/ghana.jpg",
    },
    {
      templeName: "Salt Lake",
      location: "Salt Lake City, Utah, United States",
      dedicated: "1893, April, 6",
      area: 382207,
      imageUrl: "images/salt-lake.jpg",
    },
    {
      templeName: "Paris France",
      location: "Le Chesnay, France",
      dedicated: "2017, May, 21",
      area: 44175,
      imageUrl: "images/paris.jpg",
    },
  ];

  /* =========================
     Helpers
     ========================= */
  const gallery = document.getElementById("gallery");
  const pageTitle = document.getElementById("pageTitle");

  // Parse the year from `dedicated` string like "1888, May, 21"
  function getDedicatedYear(temple) {
    const yearStr = String(temple.dedicated).split(",")[0].trim();
    const year = parseInt(yearStr, 10);
    return Number.isNaN(year) ? null : year;
  }

  function formatNumber(n) {
    return new Intl.NumberFormat().format(n);
  }

  function makeCard(t) {
    const card = document.createElement("article");
    card.className = "card";

    const img = document.createElement("img");
    img.src = t.imageUrl;
    img.alt = t.templeName;
    img.loading = "lazy"; // native lazy loading ✅

    const content = document.createElement("div");
    content.className = "content";

    const h3 = document.createElement("h3");
    h3.textContent = t.templeName;

    const loc = document.createElement("p");
    loc.className = "meta";
    loc.textContent = `Location: ${t.location}`;

    const ded = document.createElement("p");
    ded.className = "meta";
    ded.textContent = `Dedicated: ${t.dedicated}`;

    const area = document.createElement("p");
    area.className = "meta";
    area.textContent = `Area: ${formatNumber(t.area)} sq ft`;

    content.append(h3, loc, ded, area);
    card.append(img, content);
    return card;
  }

  function renderGallery(list) {
    gallery.innerHTML = "";
    list.forEach((t) => gallery.appendChild(makeCard(t)));
  }

  /* =========================
     Filters
     ========================= */
  const FILTERS = {
    home: () => temples,
    old: () => temples.filter((t) => (getDedicatedYear(t) ?? 9999) < 1900),
    new: () => temples.filter((t) => (getDedicatedYear(t) ?? 0) >= 2000),
    large: () => temples.filter((t) => t.area >= 90000),
    small: () => temples.filter((t) => t.area < 10000),
  };

  function applyFilter(key) {
    const fn = FILTERS[key] || FILTERS.home;
    const list = fn();
    renderGallery(list);
    pageTitle.textContent = key.charAt(0).toUpperCase() + key.slice(1);
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

  // Nav click -> filter + close menu on mobile
  nav.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-filter]");
    if (!link) return;
    e.preventDefault();

    const key = link.getAttribute("data-filter");
    applyFilter(key);

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
  applyFilter("home");
});



