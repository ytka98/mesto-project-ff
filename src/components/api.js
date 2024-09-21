// Конфиг
const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/pwff-cohort-1",
  headers: {
    authorization: "d1dea879-99ce-4d94-9c28-33c71240ac81",
    "Content-Type": "application/json",
  },
};

// // Тест для запроса данных
// const fetchData = async () => {
//   try {
//     const response = await fetch(config.baseUrl, {
//       headers: config.headers,
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const result = await response.json();
//     console.log(result); // Выводим результат запроса в консоль
//   } catch (error) {
//     console.error("Ошибка при запросе данных:", error); // Обработка ошибок
//   }
// };

const checkResponseStatus = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

const fetchInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(checkResponseStatus)
    .catch((err) => {
      console.log(`Ошибка fetch запроса карточек: ${err}`);
    });
};

const fetchCurrentUserProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(checkResponseStatus)
    .catch((err) => {
      console.log(`Ошибка fetch запроса профиля: ${err}`);
    });
};

const createNewCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  })
    .then(checkResponseStatus)
    .catch((err) => {
      console.log(`Ошибка fetch запроса создания новой карточки: ${err}`);
    });
};

const deleteFromServer = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkResponseStatus)
    .catch((err) => {
      console.log(`Ошибка fetch запроса удаления карточки: ${err}`);
    });
};

const editProfile = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  })
    .then(checkResponseStatus)
    .catch((err) => {
      console.log(`Ошибка fetch запроса изменения профиля: ${err}`);
    });
};

const editAvatar = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  })
    .then(checkResponseStatus)
    .catch((err) => {
      console.log(`Ошибка fetch запроса изменения аватара: ${err}`);
    });
};

const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(checkResponseStatus)
    .catch((err) => {
      console.log(`Ошибка fetch запроса лайка: ${err}`);
    });
};

const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkResponseStatus)
    .catch((err) => {
      console.log(`Ошибка fetch запроса удаления лайка: ${err}`);
    });
};

// Экспортируем функции и конфигурацию
export {
  // fetchData,
  fetchInitialCards,
  fetchCurrentUserProfile,
  createNewCard,
  deleteFromServer,
  editProfile,
  editAvatar,
  addLike,
  deleteLike,
  config,
};
