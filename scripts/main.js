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
  const dropdown = document.querySelector('.header__lang-menu');
  const dropbtn = document.querySelector('.lang__dropdown-button');
  const dropdownContent = document.querySelector('.dropdown-content');

  dropbtn.addEventListener('click', function () {
    dropbtn.classList.toggle('open');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  });

  dropdownContent.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      const selectedLang = event.target.getAttribute('data-lang');
      dropbtn.textContent = selectedLang;
      dropdownContent.style.display = 'none';
    }
  });

  // Закрытие меню при клике вне его
  window.addEventListener('click', function (event) {
    if (!dropdown.contains(event.target)) {
      dropdownContent.style.display = 'none';
    }
  });
});
