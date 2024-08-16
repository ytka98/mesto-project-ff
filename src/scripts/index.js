import "../pages/index.css";
import { initialCards } from "./cards.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
const createCard = (cardTitle, cardImageUrl, deleteCallback) => {
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");

  // Находим нужные элементы внутри клонированного шаблона
  const imageElement = cardElement.querySelector(".card__image");
  const deleteButtonElement = cardElement.querySelector(".card__delete-button");
  const titleElement = cardElement.querySelector(".card__title");

  // Устанавливаем текст и атрибуты элементов
  titleElement.textContent = cardTitle;
  imageElement.setAttribute("alt", cardTitle);
  imageElement.setAttribute("src", cardImageUrl);

  // Добавляем обработчик события для кнопки удаления
  deleteButtonElement.addEventListener("click", deleteCallback);

  // Возвращаем созданный элемент карточки
  return cardElement;
};

// @todo: Функция удаления карточки
const handleCardDelete = (event) => {
  event.target.closest(".card").remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  cardContainer.append(createCard(item.name, item.link, handleCardDelete));
});
