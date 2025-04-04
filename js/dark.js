const storedTheme = localStorage.getItem('theme')
if (storedTheme) {
  document.documentElement.setAttribute('data-theme', storedTheme);
}
else {
  document.documentElement.setAttribute('data-theme', 'light')
}

