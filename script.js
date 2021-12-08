let profile = document.querySelector(".profile");
let popup = document.querySelector(".popup");
let form = popup.querySelector(".form");
let cardForm = document.querySelector("[name='card-edit-form']");
let editbutton = document.querySelector(".profile__edit-button");
let profileCloseButton = document.querySelector("[id='profile-form-close']");
let addButton = document.querySelector(".profile__add-button");
let popupCard = document.querySelector("[id='popup-card']");
let cardCloseButton = document.querySelector("[id='card-form-close']");

function initial() {
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

  for(i = 0; i < initialCards.length; i++){
    let photoCards =  document.querySelector(".photo-cards");

    photoCards.insertAdjacentHTML("afterbegin", 
    `<div class="photo-card">
    <img alt="${initialCards[i].name}" class="photo-card__image" src=${initialCards[i].link}>
    <img class="button delete-button" src="./images/Trash.svg"></img>
    <div class="photo-card__description">
      <h3 class="photo-card__title">${initialCards[i].name}</h3>
      <button class="button photo-card__like-button" type="button"></button>
    </div>
  </div>`)
  let deleteBtn = document.querySelector(".delete-button");
  deleteBtn.addEventListener("click", function (event) {
    event.target.parentNode.remove();
  })
  let likeBtn = document.querySelector(".photo-card__like-button")
  likeBtn.addEventListener("click", function (event) {
    event.target.classList.toggle("like-button_state_liked");
  })
  let cardBtn = document.querySelector(".photo-card__image");
  cardBtn.classList.add("button");
  cardBtn.addEventListener("click", function(event) {
    let card = event.target;
    let popup = document.querySelector(".popup-image-view");
    let popupImage = document.querySelector(".popup-image");
    let popupCloseBtn = document.querySelector(".popup-image__close-button");
    popupCloseBtn.addEventListener("click", function () {
      popup.classList.remove("popup-image-view_state_visible");
    })
    popupImage.src = card.src;
    popup.classList.toggle("popup-image-view_state_visible");    
  })
  }  
}


function togglePopup(popup) {
  popup.classList.toggle("popup_state_visible"); 
}

function renderForm() {
  let newName = form.querySelector("[id='user-name-input']");
  let newActivity = form.querySelector("[id='user-activity-input']");
  let oldName = profile.querySelector(".profile__title");
  let oldActivity = profile.querySelector(".profile__subtitle");
  newName.value = oldName.textContent;
  newActivity.value = oldActivity.textContent;
}

function submitForm(event) {
  event.preventDefault();  
  let newName = form.querySelector("[id='user-name-input']");
  let newActivity = form.querySelector("[id='user-activity-input']");
  let oldName = profile.querySelector(".profile__title");
  let oldActivity = profile.querySelector(".profile__subtitle");  
  oldName.textContent = newName.value;
  oldActivity.textContent = newActivity.value;
  togglePopup(popup);
}

function submitCard(event) {
  event.preventDefault();
  let cardName = cardForm.querySelector("[id='card-name-input']")
  let cardUrl = cardForm.querySelector("[id='card-url-input']")
  togglePopup(popupCard);
  let photoCards =  document.querySelector(".photo-cards");
  photoCards.insertAdjacentHTML("afterbegin", `
  <div class="photo-card">
  <img alt="${cardName.value}" class="photo-card__image" src=${cardUrl.value}>
  <div class="photo-card__description">
    <h3 class="photo-card__title">${cardName.value}</h3>
    <button class="button photo-card__like-button" type="button"></button>
  </div>
</div>`)
}

initial();
form.addEventListener("submit", submitForm);
editbutton.addEventListener ("click", () => togglePopup(popup));
editbutton.addEventListener ("click", renderForm);
profileCloseButton.addEventListener ("click", () => togglePopup(popup));
cardForm.addEventListener("submit", submitCard);
addButton.addEventListener("click", () => togglePopup(popupCard));
cardCloseButton.addEventListener("click", () => togglePopup(popupCard));

