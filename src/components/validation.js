/**
 * Включает валидацию для всех форм, найденных по указанному селектору.
 * @param {Object} obj - Объект с параметрами для настройки валидации.
 * @param {string} obj.formSelector - Селектор для поиска форм.
 * @param {string} obj.inputSelector - Селектор для поиска инпутов в формах.
 * @param {string} obj.submitButtonSelector - Селектор для кнопки отправки формы.
 * @param {string} obj.inactiveButtonClass - Класс для неактивной кнопки.
 * @param {string} obj.inputErrorClass - Класс для невалидного инпута.
 * @param {string} obj.errorClass - Класс для отображения ошибки.
 */
export const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, obj);
  });
};

/**
 * Проверяет валидность инпута и отображает/скрывает ошибку.
 * @param {HTMLFormElement} formElement - Форма, содержащая инпут.
 * @param {HTMLInputElement} inputElement - Инпут, который проверяется на валидность.
 * @param {Object} obj - Объект с параметрами для настройки валидации.
 */
const isValid = (formElement, inputElement, obj) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};

/**
 * Проверяет, есть ли хотя бы один невалидный инпут в форме.
 * @param {Array} inputList - Список инпутов, которые нужно проверить.
 * @returns {boolean} Возвращает true, если хотя бы один инпут не валиден.
 */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

/**
 * Переключает состояние кнопки отправки в зависимости от валидности инпутов.
 * @param {Array} inputList - Список инпутов в форме.
 * @param {HTMLButtonElement} buttonElement - Кнопка отправки формы.
 * @param {Object} obj - Объект с параметрами для настройки валидации.
 */
const toggleButtonState = (inputList, buttonElement, obj) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(obj.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(obj.inactiveButtonClass);
  }
};

/**
 * Добавляет обработчики событий для всех инпутов формы.
 * @param {HTMLFormElement} formElement - Форма, для которой добавляются обработчики.
 * @param {Object} obj - Объект с параметрами для настройки валидации.
 */
const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, obj);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
};

/**
 * Показывает сообщение об ошибке для невалидного инпута.
 * @param {HTMLFormElement} formElement - Форма, содержащая инпут.
 * @param {HTMLInputElement} inputElement - Инпут, для которого отображается ошибка.
 * @param {string} errorMessage - Текст ошибки.
 * @param {Object} obj - Объект с параметрами для настройки валидации.
 */
const showInputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

/**
 * Скрывает сообщение об ошибке для валидного инпута.
 * @param {HTMLFormElement} formElement - Форма, содержащая инпут.
 * @param {HTMLInputElement} inputElement - Инпут, для которого скрывается ошибка.
 * @param {Object} obj - Объект с параметрами для настройки валидации.
 */
const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = "";
  inputElement.setCustomValidity("");
};

/**
 * Очищает ошибки валидации формы и деактивирует кнопку отправки.
 * @param {HTMLFormElement} formElement - Форма, ошибки которой нужно очистить.
 * @param {Object} obj - Объект с параметрами для настройки валидации.
 */
export const clearValidation = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, obj);
    toggleButtonState(inputList, buttonElement, obj);
  });
};
