   // api.js
   const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/pwff-cohort-1/cards',
    headers: {
      authorization: 'd1dea879-99ce-4d94-9c28-33c71240ac81',
      'Content-Type': 'application/json'
    }
  };

  // Функция для запроса данных
  const fetchData = async () => {
    try {
      const response = await fetch(config.baseUrl, {
        headers: config.headers
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result); // Выводим результат запроса в консоль
    } catch (error) {
      console.error('Ошибка при запросе данных:', error); // Обработка ошибок
    }
  };

  // Экспортируем функцию fetchData и конфигурацию
  export { fetchData, config };