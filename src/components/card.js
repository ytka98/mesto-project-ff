const createCard = (title, imageUrl, onDeleteCard, openImagePopup, toggleLike) => { 
  const template = document.querySelector("#card-template").content; 
  const card = template.cloneNode(true).querySelector(".card"); 
  const cardImage = card.querySelector(".card__image"); 
  const deleteButton = card.querySelector(".card__delete-button"); 
  const cardTitle = card.querySelector(".card__title"); 
  const likeButton = card.querySelector(".card__like-button"); 

  cardImage.addEventListener("click", () => openImagePopup(cardImage.src, cardTitle.textContent)); 
  cardTitle.textContent = title; 
  cardImage.setAttribute("alt", title); 
  cardImage.setAttribute("src", imageUrl); 
  deleteButton.addEventListener("click", onDeleteCard); 
  likeButton.addEventListener("click", () => toggleLike(likeButton)); 
  
  return card; 
}; 

const onDeleteCard = (event) => { 
  event.target.closest(".card").remove(); 
}; 

const toggleLike = (likeButton) => { 
  likeButton.classList.toggle("card__like-button_is-active"); 
}; 

export { createCard, onDeleteCard, toggleLike };