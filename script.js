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
    let photoCardsTemplate = document.querySelector("#photo-card-template").content;
    let photoCardElement = photoCardsTemplate.querySelector(".photo-card").cloneNode(true);
    let imageElement =  photoCardElement.querySelector(".photo-card__image");
    let imageTitleElement = photoCardElement.querySelector(".photo-card__title");
    imageTitleElement.textContent = initialCards[i].name;
    imageElement.src = initialCards[i].link;
    imageElement.alt = initialCards[i].name;
    document.querySelector(".photo-cards").append(photoCardElement);

    
    
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
  togglePopup(popup)
}

function submitCard(event) {
  event.preventDefault();
  let cardName = cardForm.querySelector("[id='card-name-input']")
  let cardUrl = cardForm.querySelector("[id='card-url-input']")
  togglePopup(popupCard);
  let photoCards =  document.querySelector(".photo-cards");
  let photoCardsTemplate = document.querySelector("#photo-card-template").content;
  let photoCardElement = photoCardsTemplate.querySelector(".photo-card").cloneNode(true);
  let imageElement =  photoCardElement.querySelector(".photo-card__image");
  let imageTitleElement = photoCardElement.querySelector(".photo-card__title");
  imageElement.alt = cardName;
  imageElement.src = cardUrl;
  imageTitleElement.textContent = cardName;
  let photoCardsContainer = document.querySelectorAll(".photo-cards");
  photoCardsContainer.append(photoCardElement);

}
  
initial();
form.addEventListener("submit", submitForm);
editbutton.addEventListener ("click", () => togglePopup(popup));
editbutton.addEventListener ("click", renderForm);
profileCloseButton.addEventListener ("click", () => togglePopup(popup));
cardForm.addEventListener("submit", submitCard);
addButton.addEventListener("click", () => togglePopup(popupCard));
cardCloseButton.addEventListener("click", () => togglePopup(popupCard));