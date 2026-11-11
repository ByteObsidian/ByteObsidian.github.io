const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const themeButton = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');

const savedTheme = localStorage.getItem("theme");
const initialTheme = savedTheme === "dark" ? "dark" : "light";
document.documentElement.dataset.theme = initialTheme;

if (themeButton) {
  const updateThemeButton = (theme) => {
    const isDark = theme === "dark";
    themeButton.textContent = isDark ? "Use light theme" : "Use dark theme";
    themeButton.setAttribute("aria-pressed", String(isDark));
    themeColor?.setAttribute("content", isDark ? "#10110f" : "#f5f6ef");
  };

  updateThemeButton(initialTheme);

  themeButton.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    updateThemeButton(nextTheme);
  });
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    menuButton.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
    menuButton.textContent = isExpanded ? "Menu" : "Close";
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("is-open");
    }
  });
}

const year = document.querySelector("#current-year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}
