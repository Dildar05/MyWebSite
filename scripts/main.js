document.addEventListener('DOMContentLoaded', () => {
  // Темный режим

  // Находим кнопку для переключения темного режима в заголовке страницы
  const darkModeButton = document.querySelector('.header__dark-mode');

  // Если кнопка существует на странице
  if (darkModeButton) {
    // Получаем текущую тему из localStorage или устанавливаем по умолчанию 'light' (светлая тема)
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Устанавливаем текущую тему на элемент <html>, используя атрибут 'data-theme'
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Переключаем активное состояние кнопки в зависимости от текущей темы
    darkModeButton.classList.toggle('active', currentTheme === 'light');

    // Добавляем обработчик события 'click' на кнопку переключения темного режима
    darkModeButton.addEventListener('click', () => {
      // Получаем ссылку на корневой элемент <html>
      const rootElement = document.documentElement;

      // Определяем новую тему: если текущая тема 'light', устанавливаем 'dark', иначе 'light'
      const newTheme = rootElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';

      // Устанавливаем новую тему на элемент <html>
      rootElement.setAttribute('data-theme', newTheme);

      // Сохраняем новую тему в localStorage для будущих сессий
      localStorage.setItem('theme', newTheme);

      // Переключаем активное состояние кнопки
      darkModeButton.classList.toggle('active');
    });
  }
  // бургер меню
  const burgerButton = document.querySelector('.burger-menu');
  const burgerMenu = document.querySelector('.header__body');
  const elem = document.querySelectorAll('.burger-elem');
  if (burgerButton) {
    burgerButton.addEventListener('click', () => {
      burgerMenu.classList.toggle('active');
      burgerButton.classList.toggle('active');
    });
    document.querySelectorAll('.menu__list-link').forEach((link) => {
      link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
      });
    });
  }

  // Выпадающее меню для выбора языка

  const dropdown = document.querySelector('.header__lang-menu');
  const dropbtn = document.querySelector('.lang__dropdown-button');
  const dropdownContent = document.querySelector('.dropdown-content');

  if (dropdown && dropbtn && dropdownContent) {
    const savedLang = localStorage.getItem('selectedLang');

    if (savedLang) {
      dropbtn.textContent = savedLang;
    }

    dropbtn.addEventListener('click', () => {
      dropbtn.classList.toggle('open');
      dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    dropdownContent.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
        const selectedLang = event.target.getAttribute('data-lang');

        dropbtn.textContent = selectedLang;

        dropdownContent.style.display = 'none';

        localStorage.setItem('selectedLang', selectedLang);

        dropbtn.classList.remove('open');
      }
    });

    window.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target)) {
        dropdownContent.style.display = 'none';

        dropbtn.classList.remove('open');
      }
    });
  }

  // Навигационные вкладки и плавный скролл

  document.querySelectorAll('.menu__list-link, .page-button').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Удаляем активный класс со всех ссылок
      document.querySelectorAll('.menu__list-link.active, .page-button.active').forEach((activeLink) => {
        activeLink.classList.remove('active');
      });

      // Добавляем активный класс на текущую ссылку
      link.classList.add('active');

      // Получаем ID целевого контента
      const targetId = link.getAttribute('href') || `#${link.dataset.page}`;
      const targetContent = document.querySelector(targetId);

      if (targetContent) {
        // Сохраняем выбранную страницу в localStorage
        localStorage.setItem('selectedPage', targetId);

        // Плавно скроллим страницу к началу
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        // Ждем окончания скролла и показываем нужный контент
        setTimeout(() => {
          // Скрываем все табы
          document.querySelectorAll('.tab-content').forEach((tab) => {
            tab.classList.remove('visible');
          });

          // Показываем выбранный таб
          targetContent.classList.add('visible');
        }, 400); // Время соответствует длительности скролла
      }
    });
  });

  // Показываем сохранённую страницу по умолчанию

  const savedPageId = localStorage.getItem('selectedPage') || '#home';

  const savedPage = document.querySelector(savedPageId);

  if (savedPage) {
    savedPage.classList.add('visible');
  } else {
    document.querySelector('#home').classList.add('visible');
  }
});
// window.addEventListener('unload', () => {
//   // Очистка localStorage
//   localStorage.clear();
// });
