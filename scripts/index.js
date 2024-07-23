// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardWrapper = document.querySelector(".places__list");
// @todo: Функция создания карточки
const generateCard = (name, link, eventCallback) => {
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
  // Находим нужные элементы внутри клонированного шаблона
  const image = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const title = cardElement.querySelector(".card__title");
  // Устанавливаем текст и атрибуты элементов
  // Устанавливаем текст и атрибуты элементов
  title.textContent = name; // Для текста удобнее использовать textContent
  image.setAttribute("alt", name);
  image.setAttribute("src", link);
  // Добавляем обработчик события для кнопки удаления
  deleteButton.addEventListener("click", eventCallback);
  // Возвращаем созданный элемент карточки
  return cardElement;
};

// @todo: Функция удаления карточки
const terminateCard = (evt) => {
  evt.target.closest(".card").remove();
};
// @todo: Вывести карточки на страницу

// Вывести карточки на страницу
initialCards.forEach((item) => {
  cardWrapper.append(generateCard(item.name, item.link, terminateCard));
});
