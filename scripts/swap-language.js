// Функция для смены языка
function setLanguage(language) {
  // Находим все элементы с атрибутом data-i18n
  const elements = document.querySelectorAll('[data-i18n]');

  elements.forEach((element) => {
    // Получаем строку JSON из атрибута data-i18n
    const translations = JSON.parse(element.getAttribute('data-i18n'));

    // Получаем перевод на нужном языке
    const translation = translations[language];

    // Устанавливаем перевод, если он существует
    if (translation) {
      element.textContent = translation;
    }
  });
}

// Устанавливаем язык по умолчанию при загрузке
window.onload = () => {
  setLanguage('en'); // По умолчанию английский
};
