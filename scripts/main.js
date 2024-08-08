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

  // Выпадающее меню для выбора языка
  // Находим элементы выпадающего меню для выбора языка
  const dropdown = document.querySelector('.header__lang-menu');
  const dropbtn = document.querySelector('.lang__dropdown-button');
  const dropdownContent = document.querySelector('.dropdown-content');

  // Если элементы выпадающего меню существуют на странице
  if (dropdown && dropbtn && dropdownContent) {
    // Получаем сохранённый язык из localStorage
    const savedLang = localStorage.getItem('selectedLang');

    // Если язык сохранён, устанавливаем его в качестве текста на кнопке
    if (savedLang) {
      dropbtn.textContent = savedLang;
    }

    // Добавляем обработчик события 'click' на кнопку выпадающего меню
    dropbtn.addEventListener('click', () => {
      // Переключаем класс 'open' у кнопки, чтобы отобразить или скрыть меню
      dropbtn.classList.toggle('open');

      // Переключаем отображение содержимого выпадающего меню (блок или скрытие)
      dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    // Добавляем обработчик события клика на содержимое выпадающего меню
    dropdownContent.addEventListener('click', (event) => {
      // Если кликнули на ссылку
      if (event.target.tagName === 'A') {
        // Получаем выбранный язык из атрибута 'data-lang' у элемента
        const selectedLang = event.target.getAttribute('data-lang');

        // Меняем текст кнопки на выбранный язык
        dropbtn.textContent = selectedLang;

        // Скрываем содержимое выпадающего меню
        dropdownContent.style.display = 'none';

        // Сохраняем выбранный язык в localStorage для будущих сессий
        localStorage.setItem('selectedLang', selectedLang);

        // Убираем класс 'open' у кнопки, чтобы она выглядела неактивной
        dropbtn.classList.remove('open');
      }
    });

    // Добавляем обработчик события 'click' на весь документ
    window.addEventListener('click', (event) => {
      // Если кликнули вне выпадающего меню
      if (!dropdown.contains(event.target)) {
        // Скрываем содержимое выпадающего меню
        dropdownContent.style.display = 'none';

        // Убираем класс 'open' у кнопки, чтобы она выглядела неактивной
        dropbtn.classList.remove('open');
      }
    });
  }

  // Навигационные вкладки и плавный скролл

  // Находим все ссылки на вкладки меню и кнопки для перехода по страницам
  document.querySelectorAll('.menu__list-link, .page-button').forEach((link) => {
    // Добавляем обработчик события 'click' на каждую ссылку
    link.addEventListener('click', (e) => {
      // Предотвращаем стандартное действие по умолчанию (например, переход по ссылке)
      e.preventDefault();

      // Получаем ID целевой секции или страницы, на которую ведёт ссылка
      const targetId = link.getAttribute('href') || `#${link.dataset.page}`;

      // Находим целевой элемент на странице по ID
      const targetContent = document.querySelector(targetId);

      // Если целевой элемент найден
      if (targetContent) {
        // Сохраняем выбранную страницу в localStorage для будущих сессий
        localStorage.setItem('selectedPage', targetId);

        // Плавный скролл к верху страницы
        window.scrollTo({
          top: 0, // Скролл к самому верху страницы
          behavior: 'smooth', // Плавный переход
        });

        // После скролла убираем класс 'visible' у всех элементов
        setTimeout(() => {
          document.querySelectorAll('.tab-content').forEach((tab) => {
            tab.classList.remove('visible');
          });

          // Добавляем класс 'visible' к целевому элементу
          targetContent.classList.add('visible');
        }, 400); // Задержка для синхронизации с длительностью скролла (в миллисекундах)
      }
    });
  });

  // Показываем сохранённую страницу по умолчанию

  // Получаем ID последней выбранной страницы из localStorage или устанавливаем '#home' по умолчанию
  const savedPageId = localStorage.getItem('selectedPage') || '#home';

  // Находим элемент с ID последней выбранной страницы
  const savedPage = document.querySelector(savedPageId);

  // Если элемент найден, добавляем ему класс 'visible'
  if (savedPage) {
    savedPage.classList.add('visible');
  } else {
    // Если элемент не найден, по умолчанию показываем домашнюю страницу
    document.querySelector('#home').classList.add('visible');
  }
});
// window.addEventListener('unload', () => {
//   // Очистка localStorage
//   localStorage.clear();
// });
