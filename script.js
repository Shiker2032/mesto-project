let profile = document.querySelector(".profile");
let popup = document.querySelector(".popup");
let form = popup.querySelector(".form");
let cardForm = document.querySelector("[name='card-edit-form']");
let editbutton = document.querySelector(".profile__edit-button");
let profileCloseButton = document.querySelector("[id='profile-form-close']");
let addButton = document.querySelector(".profile__add-button");
let popupCard = document.querySelector("[id='popup-card']");
let cardCloseButton = document.querySelector("[id='card-form-close']");

function addCardFunctions (photoCardElement) {
  let deleteButton = photoCardElement.querySelector(".photo-card__delete-button");
  deleteButton.addEventListener("click", function (event) {
    event.target.parentNode.remove();
  })
  let likeButton = photoCardElement.querySelector(".photo-card__like-button");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("like-button_state_liked");
  })
  let cardPop = photoCardElement.querySelector(".photo-card__image");//popup-картинка
   cardPop.classList.add("button");
   cardPop.addEventListener("click", function(event) {
     let card = event.target;   
     let popup = document.querySelector(".popup-image");
     let popupTitle = popup.querySelector(".popup-image__title");
     let popupImage = document.querySelector(".popup-image__image");
   let popupCloseBtn = document.querySelector(".popup-image__close-button");
   popupCloseBtn.addEventListener("click", function () {
     popup.classList.remove("popup-image_state_visible");
   })
   popupImage.src = card.src;
   popupTitle.textContent = card.alt;

   popup.classList.toggle("popup-image_state_visible");    
 })
}

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
    let photoCardTemplate = document.querySelector("#photo-card-template").content;
    let photoCardElement = photoCardTemplate.querySelector(".photo-card").cloneNode(true);
    let imageElement =  photoCardElement.querySelector(".photo-card__image");
    let imageTitleElement = photoCardElement.querySelector(".photo-card__title");
    imageTitleElement.textContent = initialCards[i].name;
    imageElement.src = initialCards[i].link;
    imageElement.alt = initialCards[i].name;
    addCardFunctions(photoCardElement);   
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
  let photoCards =  document.querySelector(".photo-cards");
  let photoCardTemplate = document.querySelector("#photo-card-template").content;
  let photoCardElement = photoCardTemplate.querySelector(".photo-card").cloneNode(true);
  let imageElement =  photoCardElement.querySelector(".photo-card__image");
  let imageTitleElement = photoCardElement.querySelector(".photo-card__title");
  togglePopup(popupCard);
  imageElement.alt = cardName.value;
  imageElement.src = cardUrl.value;
  imageTitleElement.textContent = cardName.value;
  let photoCardsContainer = document.querySelector(".photo-cards");
  addCardFunctions(photoCardElement);
  photoCardsContainer.prepend(photoCardElement);
}
  
initial();
form.addEventListener("submit", submitForm);
editbutton.addEventListener ("click", () => togglePopup(popup));
editbutton.addEventListener ("click", renderForm);
profileCloseButton.addEventListener ("click", () => togglePopup(popup));
cardForm.addEventListener("submit", submitCard);
addButton.addEventListener("click", () => togglePopup(popupCard));
cardCloseButton.addEventListener("click", () => togglePopup(popupCard));