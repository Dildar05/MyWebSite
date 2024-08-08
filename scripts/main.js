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
  //multilingualism
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

  window.addEventListener('click', function (event) {
    if (!dropdown.contains(event.target)) {
      dropdownContent.style.display = 'none';
    }
  });
  //to be continued ...

  //navigation tabs
  // const listItem = document.querySelectorAll('.menu__list-link');
  // const pages = document.querySelectorAll('.page');

  // listItem.forEach((elem) => {
  //   elem.addEventListener('click', showPage);
  // });

  // function(evt){

  // }
  const tabs = document.querySelectorAll('.menu__list-link');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      // Remove 'visible' class from all tab contents
      tabContents.forEach((tab) => {
        tab.classList.remove('visible');
      });

      // Add 'visible' class to the selected tab content
      const targetContent = document.querySelector(link.getAttribute('href'));

      targetContent.classList.add('visible');
    });
  });

  // Show the first tab content by default
  document.querySelector('#home').classList.add('visible');
});
