const yearNode = document.querySelector("#year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const nav = document.querySelector(".site-nav");
const navToggle = document.querySelector(".nav-toggle");
const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (themeToggle) {
  const getStoredTheme = () => {
    try {
      return window.localStorage.getItem("theme");
    } catch {
      return null;
    }
  };

  const saveTheme = (theme) => {
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // The theme still changes for this visit if browser storage is unavailable.
    }
  };

  const updateThemeLabel = () => {
    const isDark = root.dataset.theme === "dark";
    themeToggle.textContent = isDark ? "Light" : "Dark";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
  };

  const storedTheme = getStoredTheme();
  if (storedTheme === "dark" || storedTheme === "light") {
    root.dataset.theme = storedTheme;
  }

  updateThemeLabel();

  themeToggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    saveTheme(nextTheme);
    updateThemeLabel();
  });
}
