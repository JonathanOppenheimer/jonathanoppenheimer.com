const btn = document.querySelector(".toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  moon.classList.toggle("visible");
  sun.classList.toggle("visible");
  document.body.classList.toggle("dark-theme");
} else if (currentTheme == "light") {
  document.body.classList.toggle("light-theme");
} else {
  // Handle default system preference
  if (prefersDarkScheme.matches) {
    moon.classList.toggle("visible");
    sun.classList.toggle("visible");
  }
}

btn.addEventListener("click", function () {
  sun.classList.toggle("visible");
  moon.classList.toggle("visible");
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    var theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";
  } else {
    document.body.classList.toggle("dark-theme");
    var theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
  }
  localStorage.setItem("theme", theme);
});
