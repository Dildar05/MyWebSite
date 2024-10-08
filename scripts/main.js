document.addEventListener('DOMContentLoaded', () => {
  // Темный режим
  const darkModeButton = document.querySelector('.header__dark-mode');
  if (darkModeButton) {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    darkModeButton.classList.toggle('active', currentTheme === 'light');

    darkModeButton.addEventListener('click', () => {
      const rootElement = document.documentElement;
      const newTheme = rootElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      rootElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      darkModeButton.classList.toggle('active');
    });
  }

  // Бургер-меню
  const burgerButton = document.querySelector('.burger-menu');
  const burgerMenu = document.querySelector('.header__body');
  if (burgerButton) {
    burgerButton.addEventListener('click', () => {
      burgerMenu.classList.toggle('active');
      burgerButton.classList.toggle('active');
    });

    document.querySelectorAll('.menu__list-link').forEach((link) => {
      link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        burgerButton.classList.remove('active');
      });
    });
  }

  // Выпадающее меню для выбора языка
  const dropdown = document.querySelector('.header__lang-menu');
  const dropbtn = document.querySelector('.lang__dropdown-button');
  const dropdownContent = document.querySelector('.dropdown-content');
  if (dropdown && dropbtn && dropdownContent) {
    const savedLang = localStorage.getItem('selectedLang');
    if (savedLang) dropbtn.textContent = savedLang;

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
      document.querySelectorAll('.menu__list-link.active, .page-button.active').forEach((activeLink) => {
        activeLink.classList.remove('active');
      });
      link.classList.add('active');

      const targetId = link.getAttribute('href') || `#${link.dataset.page}`;
      const targetContent = document.querySelector(targetId);
      if (targetContent) {
        localStorage.setItem('selectedPage', targetId);

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        setTimeout(() => {
          document.querySelectorAll('.tab-content').forEach((tab) => {
            tab.classList.remove('visible');
          });
          targetContent.classList.add('visible');
        }, 400);
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

// Параллакс
document.addEventListener('mousemove', (e) => {
  const items = document.querySelectorAll('.parallax-item');
  const speed = 0.04;
  items.forEach((item) => {
    const itemX = (window.innerWidth / 2 - e.pageX) * speed;
    const itemY = (window.innerHeight / 2 - e.pageY) * speed;
    item.style.transform = `translate(${itemX}px, ${itemY}px)`;
  });
});

// Попап
const popupBtn = document.querySelector('.developer-contact-me');
const popup = document.querySelector('.popup');
const popupBody = document.querySelector('.popup__body');
const popupCloseIcon = document.querySelectorAll('.close-popup');

if (popupBtn && popup && popupBody) {
  popupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.add('open');
  });

  popupCloseIcon.forEach((elem) => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      popup.classList.remove('open');
    });
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popupBody) {
      popup.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      popup.classList.remove('open');
    }
  });
}
const form = document.querySelector('.contacts__form');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
  const formData = new FormData(form);
  e.preventDefault();

  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  result.innerHTML = 'Please wait...';

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = 'Something went wrong!';
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = 'none';
      }, 3000);
    });
});
// document.addEventListener('DOMContentLoaded', () => {
//   // Темный режим

//   // Находим кнопку для переключения темного режима в заголовке страницы
//   const darkModeButton = document.querySelector('.header__dark-mode');

//   // Если кнопка существует на странице
//   if (darkModeButton) {
//     // Получаем текущую тему из localStorage или устанавливаем по умолчанию 'light' (светлая тема)
//     const currentTheme = localStorage.getItem('theme') || 'light';

//     // Устанавливаем текущую тему на элемент <html>, используя атрибут 'data-theme'
//     document.documentElement.setAttribute('data-theme', currentTheme);

//     // Переключаем активное состояние кнопки в зависимости от текущей темы
//     darkModeButton.classList.toggle('active', currentTheme === 'light');

//     // Добавляем обработчик события 'click' на кнопку переключения темного режима
//     darkModeButton.addEventListener('click', () => {
//       // Получаем ссылку на корневой элемент <html>
//       const rootElement = document.documentElement;

//       // Определяем новую тему: если текущая тема 'light', устанавливаем 'dark', иначе 'light'
//       const newTheme = rootElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';

//       // Устанавливаем новую тему на элемент <html>
//       rootElement.setAttribute('data-theme', newTheme);

//       // Сохраняем новую тему в localStorage для будущих сессий
//       localStorage.setItem('theme', newTheme);

//       // Переключаем активное состояние кнопки
//       darkModeButton.classList.toggle('active');
//     });
//   }
//   // бургер меню
//   const burgerButton = document.querySelector('.burger-menu');
//   const burgerMenu = document.querySelector('.header__body');

//   if (burgerButton) {
//     burgerButton.addEventListener('click', () => {
//       burgerMenu.classList.toggle('active');
//       burgerButton.classList.toggle('active');
//     });
//     document.querySelectorAll('.menu__list-link').forEach((link) => {
//       link.addEventListener('click', () => {
//         burgerMenu.classList.remove('active');
//         burgerButton.classList.remove('active');
//       });
//     });
//   }

//   // Выпадающее меню для выбора языка

//   const dropdown = document.querySelector('.header__lang-menu');
//   const dropbtn = document.querySelector('.lang__dropdown-button');
//   const dropdownContent = document.querySelector('.dropdown-content');

//   if (dropdown && dropbtn && dropdownContent) {
//     const savedLang = localStorage.getItem('selectedLang');

//     if (savedLang) {
//       dropbtn.textContent = savedLang;
//     }

//     dropbtn.addEventListener('click', () => {
//       dropbtn.classList.toggle('open');
//       dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
//     });

//     dropdownContent.addEventListener('click', (event) => {
//       if (event.target.tagName === 'A') {
//         const selectedLang = event.target.getAttribute('data-lang');

//         dropbtn.textContent = selectedLang;

//         dropdownContent.style.display = 'none';

//         localStorage.setItem('selectedLang', selectedLang);

//         dropbtn.classList.remove('open');
//       }
//     });

//     window.addEventListener('click', (event) => {
//       if (!dropdown.contains(event.target)) {
//         dropdownContent.style.display = 'none';

//         dropbtn.classList.remove('open');
//       }
//     });
//   }

//   // Навигационные вкладки и плавный скролл

//   document.querySelectorAll('.menu__list-link, .page-button').forEach((link) => {
//     link.addEventListener('click', (e) => {
//       e.preventDefault();

//       // Удаляем активный класс со всех ссылок
//       document.querySelectorAll('.menu__list-link.active, .page-button.active').forEach((activeLink) => {
//         activeLink.classList.remove('active');
//       });

//       // Добавляем активный класс на текущую ссылку
//       link.classList.add('active');

//       // Получаем ID целевого контента
//       const targetId = link.getAttribute('href') || `#${link.dataset.page}`;
//       const targetContent = document.querySelector(targetId);

//       if (targetContent) {
//         // Сохраняем выбранную страницу в localStorage
//         localStorage.setItem('selectedPage', targetId);

//         // Плавно скроллим страницу к началу
//         window.scrollTo({
//           top: 0,
//           behavior: 'smooth',
//         });

//         // Ждем окончания скролла и показываем нужный контент
//         setTimeout(() => {
//           // Скрываем все табы
//           document.querySelectorAll('.tab-content').forEach((tab) => {
//             tab.classList.remove('visible');
//           });

//           // Показываем выбранный таб
//           targetContent.classList.add('visible');
//         }, 400); // Время соответствует длительности скролла
//       }
//     });
//   });

//   // Показываем сохранённую страницу по умолчанию

//   const savedPageId = localStorage.getItem('selectedPage') || '#home';

//   const savedPage = document.querySelector(savedPageId);

//   if (savedPage) {
//     savedPage.classList.add('visible');
//   } else {
//     document.querySelector('#home').classList.add('visible');
//   }
// });
// // window.addEventListener('unload', () => {
// //   // Очистка localStorage
// //   localStorage.clear();
// // });
// document.addEventListener('mousemove', function (e) {
//   const items = document.querySelectorAll('.parallax-item');
//   const speed = 0.04; // Коэффициент скорости движения

//   items.forEach((item) => {
//     const itemX = (window.innerWidth / 2 - e.pageX) * speed;
//     const itemY = (window.innerHeight / 2 - e.pageY) * speed;

//     item.style.transform = `translate(${itemX}px, ${itemY}px)`;
//   });
// });

// //popup
// const popupBtn = document.querySelector('.developer-contact-me');
// const popup = document.querySelector('.popup');
// const popupBody = document.querySelector('.popup__body');
// const popupCloseIcon = document.querySelectorAll('.close-popup');

// // Открытие попапа
// popupBtn.addEventListener('click', function (e) {
//   e.preventDefault();
//   popupOpen();
// });

// // Закрытие попапа по клику на крестик
// popupCloseIcon.forEach((elem) => {
//   elem.addEventListener('click', function (e) {
//     e.preventDefault();
//     popupClose();
//   });
// });

// // Закрытие попапа по клику вне его области
// popup.addEventListener('click', function (e) {
//   if (e.target === popupBody) {
//     popupClose();
//   }
// });

// document.addEventListener('keydown', function (e) {
//   if (e.key === 'Escape') {
//     popupClose();
//   }
// });
// function popupOpen() {
//   popup.classList.add('open');
// }

// function popupClose() {
//   popup.classList.remove('open');
// }
// приберись в коде но ничего не удаляй понял
