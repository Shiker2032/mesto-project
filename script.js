let profile = document.querySelector(".profile");
let popup = document.querySelector(".popup");
let form = popup.querySelector(".form");
let editbutton = document.querySelector(".profile__edit-button");
let popupCloseButton = document.querySelector(".popup__close-button");



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
    <div class="photo-card__description">
      <h3 class="photo-card__title">${initialCards[i].name}</h3>
      <button class="button photo-card__like-button" type="button"></button>
    </div>
  </div>`)
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
  togglePopup();
}



editbutton.addEventListener ("click", () => togglePopup(popup));
editbutton.addEventListener ("click", renderForm);
popupCloseButton.addEventListener ("click", () => togglePopup(popup));
form.addEventListener("submit", submitForm);



// 'beforebegin' — вставка до открывающего тега;
// 'afterbegin' — вставка после открывающего тега;
// 'afterend' — вставка после закрывающего тега.

initial();