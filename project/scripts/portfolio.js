/**
 * Daniel Ayodele Portfolio - Main JavaScript File
 * Contains all interactive functionality for the portfolio website
 */

// ================================================
// Data Objects
// ================================================

// Skills data - array of objects
const skills = [
  { name: "HTML5", icon: "📄", category: "frontend" },
  { name: "CSS3", icon: "🎨", category: "frontend" },
  { name: "JavaScript", icon: "⚡", category: "frontend" },
  { name: "React", icon: "⚛️", category: "frontend" },
  { name: "Node.js", icon: "🟢", category: "backend" },
  { name: "Python", icon: "🐍", category: "backend" },
  { name: "Git", icon: "📊", category: "tools" },
  { name: "Responsive Design", icon: "📱", category: "frontend" },
  { name: "API Development", icon: "🔌", category: "backend" },
  { name: "Database", icon: "🗄️", category: "backend" },
  { name: "UI/UX", icon: "🎯", category: "design" },
  { name: "TypeScript", icon: "📘", category: "frontend" },
];

// Projects data - array of objects
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured online shopping platform with cart functionality, payment integration, and admin dashboard.",
    image: "./images/place.webp",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "fullstack",
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
  },
  {
    id: 2,
    title: "Weather Dashboard",
    description:
      "Real-time weather application using OpenWeather API with location-based forecasts and interactive maps.",
    image: "./images/weather.png",
    tech: ["JavaScript", "CSS3", "OpenWeather API"],
    category: "frontend",
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
  },
  {
    id: 3,
    title: "Task Management App",
    description:
      "Collaborative task management tool with real-time updates, team features, and project tracking.",
    image: "./images/place_hero.jpg",
    tech: ["React", "Firebase", "Material UI"],
    category: "fullstack",
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "Personal portfolio website with responsive design, smooth animations, and contact form.",
    image: "./images/profile.png",
    tech: ["HTML5", "CSS3", "JavaScript"],
    category: "frontend",
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false,
  },
  {
    id: 5,
    title: "REST API Service",
    description:
      "Scalable RESTful API with authentication, rate limiting, and comprehensive documentation.",
    image: "./images/temple.webp",
    tech: ["Node.js", "Express", "PostgreSQL", "JWT"],
    category: "backend",
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false,
  },
  {
    id: 6,
    title: "Blog Platform",
    description:
      "Content management system with markdown support, SEO optimization, and comment system.",
    image: "./images/salt-lake.jpg",
    tech: ["Next.js", "Tailwind CSS", "Prisma"],
    category: "fullstack",
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false,
  },
];

// FAQ data - array of objects
const faqData = [
  {
    question: "What type of projects do you work on?",
    answer:
      "I work on a wide range of web development projects including frontend development, backend development, full-stack applications, and website optimization. I specialize in creating responsive, accessible, and performant web applications.",
  },
  {
    question: "What is your typical project timeline?",
    answer:
      "Project timelines vary depending on complexity. A simple landing page typically takes 1-2 weeks, while complex web applications can take 2-3 months. I provide detailed timelines after discussing your specific requirements.",
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer:
      "Yes, I offer ongoing support and maintenance packages for all completed projects. This includes bug fixes, security updates, and feature enhancements at a monthly rate.",
  },
  {
    question: "How do we communicate during the project?",
    answer:
      "I communicate primarily through email and video calls. For larger projects, I provide weekly progress updates and maintain transparent communication throughout the development process.",
  },
];

// ================================================
// Utility Functions
// ================================================

/**
 * Format current year for footer
 */
function updateYear() {
  const yearElements = document.querySelectorAll("#year");
  const currentYear = new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });
}

/**
 * Check if element is in viewport for lazy loading
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ================================================
// DOM Manipulation Functions
// ================================================

/**
 * Initialize mobile navigation toggle
 */
function initNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true";

      // Toggle aria-expanded attribute
      this.setAttribute("aria-expanded", !isExpanded);

      // Toggle navigation menu
      navMenu.classList.toggle("active");

      // Animate hamburger menu
      this.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !navToggle.contains(event.target) &&
        !navMenu.contains(event.target)
      ) {
        navMenu.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close menu when pressing Escape key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
}

/**
 * Render skills grid
 */
function renderSkills() {
  const skillsContainer = document.getElementById("skills-container");

  if (!skillsContainer) return;

  // Use template literals to build HTML
  const skillsHTML = skills
    .map(
      (skill) => `
        <div class="skill-card animate-fade-in">
            <span class="skill-icon">${skill.icon}</span>
            <span class="skill-name">${skill.name}</span>
        </div>
    `,
    )
    .join("");

  skillsContainer.innerHTML = skillsHTML;
}

/**
 * Render projects grid
 */
function renderProjects(filter = "all") {
  const projectsContainer = document.getElementById("projects-container");
  const noResults = document.getElementById("no-results");

  if (!projectsContainer) return;

  // Filter projects based on category
  let filteredProjects = projects;

  if (filter !== "all") {
    filteredProjects = projects.filter(
      (project) => project.category === filter,
    );
  }

  // Check if there are projects to display
  if (filteredProjects.length === 0) {
    if (noResults) noResults.style.display = "block";
    projectsContainer.innerHTML = "";
    return;
  }

  if (noResults) noResults.style.display = "none";

  // Use template literals to build HTML
  const projectsHTML = filteredProjects
    .map(
      (project) => `
        <article class="project-card animate-fade-in">
            <img src="${project.image}" 
                 alt="${project.title} project preview" 
                 class="project-image" 
                 loading="lazy"
                 width="400"
                 height="200">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Code
                    </a>
                    <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Live Demo
                    </a>
                </div>
            </div>
        </article>
    `,
    )
    .join("");

  projectsContainer.innerHTML = projectsHTML;
}

/**
 * Initialize project filter buttons
 */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (filterButtons.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.classList.add("btn-secondary");
      });

      // Add active class to clicked button
      this.classList.add("active");
      this.classList.remove("btn-secondary");

      // Get filter value
      const filter = this.getAttribute("data-filter");

      // Re-render projects with new filter
      renderProjects(filter);

      // Save filter preference to localStorage
      localStorage.setItem("projectFilter", filter);
    });
  });

  // Load saved filter from localStorage
  const savedFilter = localStorage.getItem("projectFilter");
  if (savedFilter) {
    const savedButton = document.querySelector(
      `[data-filter="${savedFilter}"]`,
    );
    if (savedButton) {
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.classList.add("btn-secondary");
      });
      savedButton.classList.add("active");
      savedButton.classList.remove("btn-secondary");
      renderProjects(savedFilter);
    }
  }
}

/**
 * Render FAQ items
 */
function renderFAQ() {
  const faqContainer = document.getElementById("faq-container");

  if (!faqContainer) return;

  // Use template literals to build HTML
  const faqHTML = faqData
    .map(
      (item, index) => `
        <div class="faq-item" style="margin-bottom: var(--spacing-md);">
            <button class="faq-question" 
                    aria-expanded="false" 
                    aria-controls="faq-answer-${index}"
                    style="width: 100%; padding: var(--spacing-md); background: var(--white); border: 1px solid var(--border); border-radius: var(--border-radius); text-align: left; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 600;">${item.question}</span>
                <span class="faq-icon" style="transition: transform 0.3s ease;">+</span>
            </button>
            <div id="faq-answer-${index}" 
                 class="faq-answer" 
                 style="padding: var(--spacing-md); background: var(--bg-light); border-radius: 0 0 var(--border-radius) var(--border-radius); display: none;">
                <p style="margin: 0; color: var(--text-light);">${item.answer}</p>
            </div>
        </div>
    `,
    )
    .join("");

  faqContainer.innerHTML = faqHTML;

  // Add click handlers for FAQ accordion
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question, index) => {
    question.addEventListener("click", function () {
      const answer = document.getElementById(`faq-answer-${index}`);
      const icon = this.querySelector(".faq-icon");
      const isExpanded = this.getAttribute("aria-expanded") === "true";

      // Toggle expanded state
      this.setAttribute("aria-expanded", !isExpanded);

      // Toggle answer visibility
      if (isExpanded) {
        answer.style.display = "none";
        icon.textContent = "+";
      } else {
        answer.style.display = "block";
        icon.textContent = "-";
      }
    });
  });
}

/**
 * Initialize contact form validation and submission
 */
function initContactForm() {
  const form = document.getElementById("contact-form");

  if (!form) return;

  // Form validation and submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form fields
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    // Reset previous error states
    clearErrors();

    // Validate fields
    let isValid = true;

    // Validate name
    if (!name.value || name.value.length < 2) {
      showError(name, "name-error");
      isValid = false;
    }

    // Validate email
    if (!isValidEmail(email.value)) {
      showError(email, "email-error");
      isValid = false;
    }

    // Validate subject
    if (!subject.value || subject.value.length < 5) {
      showError(subject, "subject-error");
      isValid = false;
    }

    // Validate message
    if (!message.value || message.value.length < 20) {
      showError(message, "message-error");
      isValid = false;
    }

    // If valid, process form submission
    if (isValid) {
      // Get form data as object
      const formData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value,
        projectType:
          document.getElementById("project-type")?.value || "not specified",
        budget: document.getElementById("budget")?.value || "not specified",
        timestamp: new Date().toISOString(),
      };

      // Store in localStorage (simulating form submission)
      const submissions = JSON.parse(
        localStorage.getItem("formSubmissions") || "[]",
      );
      submissions.push(formData);
      localStorage.setItem("formSubmissions", JSON.stringify(submissions));

      // Show success message
      const successMessage = document.getElementById("form-success");
      if (successMessage) {
        successMessage.classList.add("visible");
        form.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.classList.remove("visible");
        }, 5000);
      }

      // Log submission (in production, this would send to a server)
      console.log("Form submitted:", formData);
    }
  });

  // Real-time validation on blur
  const inputs = form.querySelectorAll(".form-input, .form-textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      // Clear error when user starts typing
      if (this.classList.contains("error")) {
        this.classList.remove("error");
        const errorElement = document.getElementById(`${this.id}-error`);
        if (errorElement) {
          errorElement.classList.remove("visible");
        }
      }
    });
  });
}

/**
 * Validate individual field
 */
function validateField(field) {
  const fieldId = field.id;
  let isValid = true;

  switch (fieldId) {
    case "name":
      if (!field.value || field.value.length < 2) {
        showError(field, "name-error");
        isValid = false;
      }
      break;
    case "email":
      if (!isValidEmail(field.value)) {
        showError(field, "email-error");
        isValid = false;
      }
      break;
    case "subject":
      if (!field.value || field.value.length < 5) {
        showError(field, "subject-error");
        isValid = false;
      }
      break;
    case "message":
      if (!field.value || field.value.length < 20) {
        showError(field, "message-error");
        isValid = false;
      }
      break;
  }

  return isValid;
}

/**
 * Show error message for a field
 */
function showError(field, errorId) {
  field.classList.add("error");
  const errorElement = document.getElementById(errorId);
  if (errorElement) {
    errorElement.classList.add("visible");
  }
}

/**
 * Clear all error messages
 */
function clearErrors() {
  const errorInputs = document.querySelectorAll(
    ".form-input.error, .form-textarea.error",
  );
  errorInputs.forEach((input) => {
    input.classList.remove("error");
  });

  const errorMessages = document.querySelectorAll(".form-error.visible");
  errorMessages.forEach((message) => {
    message.classList.remove("visible");
  });
}

/**
 * Validate email address using regex
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Initialize theme preference (for future enhancement)
 */
function initThemePreference() {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");

  // If no saved preference, check system preference
  if (!savedTheme) {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (prefersDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  } else {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-fade-in");

  if (animatedElements.length === 0) return;

  // Add initial hidden state
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
  });

  // Check visibility on scroll
  const checkVisibility = () => {
    animatedElements.forEach((element) => {
      if (isInViewport(element)) {
        element.style.opacity = "1";
      }
    });
  };

  // Initial check
  checkVisibility();

  // Check on scroll
  window.addEventListener("scroll", checkVisibility);
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if (lazyImages.length === 0) return;

  // Use Intersection Observer for better performance
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

/**
 * Initialize visit counter using localStorage
 */
function initVisitCounter() {
  const visitCount = localStorage.getItem("visitCount");
  const lastVisit = localStorage.getItem("lastVisit");
  const currentVisit = new Date().toISOString();

  // Update visit count
  let newCount = 1;
  if (visitCount) {
    newCount = parseInt(visitCount) + 1;
  }
  localStorage.setItem("visitCount", newCount.toString());
  localStorage.setItem("lastVisit", currentVisit);

  // Log visit info (for debugging)
  console.log(`Visit #${newCount}`);
  console.log("Last visit:", lastVisit);
}

// ================================================
// Main Initialization
// ================================================

/**
 * Initialize all functionality when DOM is ready
 */
function init() {
  // Run initial setup functions
  updateYear();
  initNavigation();
  initThemePreference();
  initVisitCounter();

  // Render dynamic content
  renderSkills();
  renderProjects();
  renderFAQ();

  // Initialize interactive features
  initProjectFilters();
  initContactForm();
  initScrollAnimations();
  initLazyLoading();

  console.log("Portfolio website initialized successfully!");
}

// Run initialization when DOM is fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
