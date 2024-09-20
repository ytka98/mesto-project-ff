/**
 * @param {HTMLInputElement} nameField - Поле ввода имени в попапе редактирования профиля.
 * @param {HTMLInputElement} jobField - Поле ввода описания (деятельности) в попапе редактирования профиля.
 * @param {HTMLElement} profileTitle - Элемент с названием профиля (имя пользователя).
 * @param {HTMLElement} profileDescription - Элемент с описанием профиля (деятельность пользователя).
 * @param {HTMLTemplateElement} cardTemplate - Шаблон для создания карточки.
 * @param {HTMLElement} cardsList - Список, куда добавляются карточки с местами.
 * @param {HTMLButtonElement} addCardBtn - Кнопка для открытия попапа добавления новой карточки.
 * @param {HTMLButtonElement} editProfileBtn - Кнопка для открытия попапа редактирования профиля.
 * @param {HTMLElement} newCardPopup - Попап для добавления новой карточки.
 * @param {HTMLElement} editProfilePopup - Попап для редактирования профиля.
 * @param {HTMLElement} imagePopup - Попап с изображением карточки.
 * @param {HTMLElement} avatarEditPopup - Попап для редактирования аватара.
 * @param {HTMLInputElement} cardTitleInput - Поле ввода названия карточки.
 * @param {HTMLInputElement} cardUrlInput - Поле ввода URL изображения для карточки.
 * @param {HTMLImageElement} popupImage - Изображение внутри попапа с карточкой.
 * @param {HTMLElement} popupCaption - Подпись к изображению в попапе с карточкой.
 * @param {HTMLElement} profileAvatar - Элемент с аватаром профиля.
 * @param {HTMLInputElement} avatarPopupLink - Поле ввода ссылки для редактирования аватара.
 * @param {Object} defaultValidationConfig - Конфигурация для валидации форм.
 * @param {string} defaultValidationConfig.formSelector - Селектор формы для валидации.
 * @param {string} defaultValidationConfig.inputSelector - Селектор полей ввода.
 * @param {string} defaultValidationConfig.submitButtonSelector - Селектор кнопки отправки формы.
 * @param {string} defaultValidationConfig.inactiveButtonClass - Класс неактивной кнопки.
 * @param {string} defaultValidationConfig.inputErrorClass - Класс для поля с ошибкой.
 * @param {string} defaultValidationConfig.errorClass - Класс для ошибки.
 * @param {string} userId - Идентификатор текущего пользователя.
 * @param {Function} renderLoading - Функция для отображения состояния загрузки данных.
 * @param {Function} createCard - Функция для создания новой карточки.
 * @param {Function} showPopup - Функция для открытия попапа.
 * @param {Function} closePopup - Функция для закрытия попапа.
 * @param {Function} fetchCurrentUserProfile - Функция для получения данных текущего пользователя с сервера.
 * @param {Function} fetchInitialCards - Функция для получения начальных карточек с сервера.
 * @param {Function} createNewCard - Функция для создания новой карточки на сервере.
 * @param {Function} deleteFromServer - Функция для удаления карточки с сервера.
 * @param {Function} addLike - Функция для добавления лайка карточке.
 * @param {Function} deleteLike - Функция для удаления лайка с карточки.
 * @param {Function} editProfile - Функция для редактирования профиля пользователя.
 * @param {Function} editAvatar - Функция для изменения аватара пользователя.
 * @param {Function} clearValidation - Функция для очистки ошибок валидации формы.
 * @param {Function} createNewContentCardPopup - Функция для открытия попапа с изображением карточки.
 */

import "../pages/index.css";
import { createCard } from "../components/card.js";
import { showPopup, closePopup } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";

import {
  fetchData,
  fetchInitialCards,
  fetchCurrentUserProfile,
  createNewCard,
  deleteFromServer,
  editProfile,
  editAvatar,
  addLike,
  deleteLike,
} from "./api.js";

// ПОЛЯ ПРОФИЛЯ
const nameField = document.querySelector(".popup__input_type_name");
const jobField = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// ШАБЛОН И СПИСОК КАРТОЧЕК
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");

// КНОПКИ
const addCardBtn = document.querySelector(".profile__add-button");
const editProfileBtn = document.querySelector(".profile__edit-button");

// ПОПАПЫ
const newCardPopup = document.querySelector(".popup_type_new-card");
const editProfilePopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");
const avatarEditPopup = document.querySelector(".popup_type_edit_avatar");

// ПОЛЯ КАРТОЧКИ
const cardTitleInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");

// ЭЛЕМЕНТЫ ПОПАПА С ИЗОБРАЖЕНИЕМ
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

// АВАТАР ПРОФИЛЯ
const profileAvatar = document.querySelector(".profile__image");
const avatarPopupLink = avatarEditPopup.querySelector(
  ".popup__input_type_edit_avatar",
);

const defaultValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// ID ПОЛЬЗОВАЛТЕЛЯ ДЛЯ РАБОТЫ С КАРТОЧКАМИ
let userId;

// ФУНКЦИЯ ОТОБРАЖЕНИЯ ЗАГРУЗКИ ПРИ ОТПРАВКЕ ДАННЫХ
function renderLoading(isLoading, popup) {
  const submitButton = popup.querySelector(".popup__button");
  submitButton.textContent = isLoading ? "Сохранение..." : "Сохранить";
}

Promise.all([fetchCurrentUserProfile(), fetchInitialCards()])
  .then(([profileData, cards]) => {
    userId = profileData._id;
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileAvatar.style.backgroundImage = `url('${profileData.avatar}')`;
    cards.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        userId,
        cardTemplate,
        showPopup,
        closePopup,
        deleteFromServer,
        addLike,
        deleteLike,
        createNewContentCardPopup,
      );
      cardsList.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(defaultValidationConfig);

addCardBtn.addEventListener("click", () => showPopup(newCardPopup));

editProfileBtn.addEventListener("click", () =>
  fillProfilePopup(editProfilePopup),
);

function fillProfilePopup(popup) {
  nameField.value = profileTitle.textContent;
  jobField.value = profileDescription.textContent;
  clearValidation(popup);
}

function handleProfileUpdateForm(event) {
  event.preventDefault();
  renderLoading(true, editProfilePopup);
  editProfile({
    name: `${nameField.value}`,
    about: `${jobField.value}`,
  })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(editProfilePopup);
    })
    .catch((err) => {
      console.log(`Ошибка fetch запроса изменения профиля: ${err}`);
    })
    .finally(() => {
      renderLoading(false, editProfilePopup);
    });
}

editProfilePopup.addEventListener("submit", handleProfileUpdateForm);

function handleNewCardForm(event) {
  event.preventDefault();
  renderLoading(true, newCardPopup);
  createNewCard({
    name: `${cardTitleInput.value}`,
    link: `${cardUrlInput.value}`,
  })
    .then((cards) => {
      const cardElement = createCard(
        cards,
        userId,
        cardTemplate,
        showPopup,
        closePopup,
        deleteFromServer,
        addLike,
        deleteLike,
        createNewContentCardPopup,
      );
      document.forms["new-place"].reset();
      closePopup(newCardPopup);
      clearValidation(newCardPopup, defaultValidationConfig);
    })
    .catch((err) => {
      console.log(`Ошибка fetch запроса создания новой карточки: ${err}`);
    })
    .finally(() => {
      renderLoading(false, newCardPopup);
    });
}

newCardPopup.addEventListener("submit", handleNewCardForm);

profileAvatar.addEventListener("click", () => showPopup(avatarEditPopup));

function changeAvatar(event) {
  event.preventDefault();
  renderLoading(true, avatarEditPopup);
  editAvatar({ avatar: `${avatarPopupLink.value}` })
    .then((data) => {
      profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
      closePopup(avatarEditPopup);
      document.forms["edit-avatar-form"].reset();
      clearValidation(avatarEditPopup, defaultValidationConfig);
    })
    .catch((err) => {
      console.log(`Ошибка fetch запроса изменения аватара: ${err}`);
    })
    .finally(() => {
      renderLoading(false, avatarEditPopup);
    });
}

avatarEditPopup.addEventListener("submit", changeAvatar);

function createNewContentCardPopup(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  showPopup(imagePopup);
}

fetchData();
