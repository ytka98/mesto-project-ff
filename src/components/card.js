/**
 * Создает карточку с данными и добавляет необходимые обработчики событий.
 *
 * @param {Object} cardData - Данные карточки.
 * @param {string} userId - Идентификатор пользователя.
 * @param {Element} cardTemplate - Шаблон карточки.
 * @param {function} showPopup - Функция для отображения попапа.
 * @param {function} closePopup - Функция для закрытия попапа.
 * @param {function} deleteFromServer - Функция для удаления карточки с сервера.
 * @param {function} addLike - Функция для добавления лайка.
 * @param {function} deleteLike - Функция для удаления лайка.
 * @param {function} openImagePopup - Функция для открытия попапа с изображением.
 * @returns {Element} card - Элемент карточки, готовый к отображению.
 */

const createCard = (
  cardData,
  userId,
  cardTemplate,
  showPopup,
  closePopup,
  deleteFromServer,
  addLike,
  deleteLike,
  openImagePopup
) => {
  const card = cardTemplate.cloneNode(true).querySelector(".card");
  const cardImage = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");
  const cardTitle = card.querySelector(".card__title");
  const likeButton = card.querySelector(".card__like-button");
  const likeScore = card.querySelector(".card__like-score");

  cardTitle.textContent = cardData.name || "Untitled"; 
  cardImage.setAttribute("alt", cardData.name || "Untitled");
  cardImage.setAttribute("src", cardData.link);
  likeScore.textContent = cardData.likes.length;

  // Проверяем, лайкал ли пользователь карточку
  const isLiked = cardData.likes.some(user => user._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardImage.addEventListener("click", () =>
    openImagePopup(cardImage.src, cardTitle.textContent),
  );

  // Логика удаления карточки
  const handleDeleteCard = () => {
    deleteFromServer(cardData._id)
      .then(() => {
        card.remove();
      })
      .catch(err => console.log(`Ошибка удаления карточки: ${err}`));
  };

  // Логика лайков
  const handleLikeToggle = () => {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      deleteLike(cardData._id)
        .then(() => {
          likeButton.classList.remove("card__like-button_is-active");
          cardData.likes = cardData.likes.filter(user => user._id !== userId);
          likeScore.textContent = cardData.likes.length; 
        })
        .catch(err => console.log(`Ошибка удаления лайка: ${err}`));
    } else {
      addLike(cardData._id)
        .then(() => {
          likeButton.classList.add("card__like-button_is-active");
          cardData.likes.push({ _id: userId }); 
          likeScore.textContent = cardData.likes.length; 
        })
        .catch(err => console.log(`Ошибка добавления лайка: ${err}`));
    }
  };

  // Устанавливаем обработчики событий
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", handleDeleteCard);
  } else {
    deleteButton.style.display = "none"; // или deleteButton.remove();
  }

  likeButton.addEventListener("click", handleLikeToggle);

  return card;
};

export { createCard };
