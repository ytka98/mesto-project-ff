// ОТКРЫТИЕ ПОПАПА ДЛЯ НОВОЙ КАРТОЧКИ И ДЛЯ РЕДАКТИРВОАНИЯ ПРОФИЛЯ
const showPopup = (popup) => {
  // console.log("Попап открывается:", popup);
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", handleClickOutsidePopup);
  document.addEventListener("keydown", handleEscKeyPress);
};

// ЗАКРЫТИЕ ПОПАПА ДЛЯ НОВОЙ КАРТОЧКИ И ДЛЯ РЕДАКТИРВОАНИЯ ПРОФИЛЯ
const closePopup = (popup) => {
  // console.log("Попап закрывается:", popup);
  // Удаляем класс, чтобы скрыть попап
  popup.classList.remove("popup_is-opened");
  // Удаляем слушатели событий
  popup.removeEventListener("click", handleClickOutsidePopup);
  document.removeEventListener("keydown", handleEscKeyPress);
};

// Функция handleClickOutsidePopup предназначена для обработки кликов по странице. Если клик происходит либо непосредственно на крестик закрытия попапа (элемент с классом popup__close), либо на сам попап (элемент с классом popup), то функция считает это как команду закрытия попапа.
const handleClickOutsidePopup = (evt) => {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    closePopup(evt.currentTarget);
  }
};

// ДОБАВЛЕНА ВОЗМОЖНОСТЬ ЗАКРЫТИЯ ПОПАПОВ С ПОМОЩЬЮ КЛАВИШИ ESC
const handleEscKeyPress = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
};

export { showPopup, closePopup, handleEscKeyPress, handleClickOutsidePopup };
