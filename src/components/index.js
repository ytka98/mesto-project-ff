import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, onDeleteCard, toggleLike } from "../components/card.js";
import { showPopup, closePopup } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import { fetchData, config } from './api.js'; // Убедитесь, что путь к api.js указан правильно

// ИНПУТЫ ПРОФИЛЯ
const jobField = document.querySelector(".popup__input_type_description");
const nameField = document.querySelector(".popup__input_type_name");

// DOM УЗЛЫ ДЛЯ КАРТОЧЕК
const cardsList = document.querySelector(".places__list");
const cardTitleInput = document.querySelector(".popup__input_type_card-name");
const addCardBtn = document.querySelector(".profile__add-button");
const cardUrlInput = document.querySelector(".popup__input_type_url");

// DOM УЗЛЫ ДЛЯ ПОПАПА
const newCardPopup = document.querySelector(".popup_type_new-card");
const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileBtn = document.querySelector(".profile__edit-button");

// DOM УЗЛЫ ДЛЯ ПОПАПА ПРОСМОТРА ИЗОБРАЖЕНИЯ
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

//Объект конфигурации для валидации форм на веб-странице, который можно переиспользовать
const defaultValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};


addCardBtn.addEventListener("click", () => showPopup(newCardPopup));
editProfileBtn.addEventListener("click", () => fillProfileForm(editProfilePopup));

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ В ПОПАПЕ ДЛЯ РЕДАКТИРОВАНИЯ
function fillProfileForm(popup) {
  nameField.value = document.querySelector(".profile__title").textContent;
  jobField.value = document.querySelector(".profile__description").textContent;
  enableValidation(defaultValidationConfig);
  showPopup(popup);
}

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameField.value;
  document.querySelector(".profile__description").textContent = jobField.value;
  closePopup(editProfilePopup);
}

editProfilePopup.addEventListener("submit", handleProfileFormSubmit);

function openImagePopup(link, name) {
  popupImage.src = link;
  popupCaption.textContent = name;
  popupImage.alt = name;
  showPopup(imagePopup);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = { name: cardTitleInput.value, link: cardUrlInput.value };
  cardsList.prepend(
    createCard(newCard.name, newCard.link, onDeleteCard, openImagePopup, toggleLike),
  );
  document.forms["new-place"].reset();
  closePopup(newCardPopup);
}

newCardPopup.addEventListener("submit", handleNewCardFormSubmit);

initialCards.forEach((item) => {
  cardsList.append(
    createCard(item.name, item.link, onDeleteCard, openImagePopup, toggleLike),
  );
});

enableValidation(defaultValidationConfig)
fetchData();