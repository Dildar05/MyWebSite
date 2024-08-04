document.addEventListener('DOMContentLoaded', (event) => {
  //darkMode
  const currentTheme = localStorage.getItem('theme');
  const darkModeButton = document.querySelector('.header__dark-mode');

  if (currentTheme === 'light') {
    darkModeButton.classList.add('active');
  } else {
    darkModeButton.classList.remove('active');
  }

  darkModeButton.addEventListener('click', () => {
    const rootElement = document.documentElement;
    let dataTheme = rootElement.getAttribute('data-theme'),
      newTheme;

    newTheme = dataTheme === 'light' ? 'dark' : 'light';
    rootElement.setAttribute('data-Theme', newTheme);

    localStorage.setItem('theme', newTheme);

    darkModeButton.classList.toggle('active');
  });
  //next functions
});
