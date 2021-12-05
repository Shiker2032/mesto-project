let profile = document.querySelector(".profile");
let popup = document.querySelector(".popup");
let form = popup.querySelector(".form");
let editbutton = document.querySelector(".profile__edit-button");
let popupCloseButton = document.querySelector(".popup__close-button");

function togglePopup() {
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

editbutton.addEventListener ("click", togglePopup);
editbutton.addEventListener ("click", renderForm);
popupCloseButton.addEventListener ("click", togglePopup)
form.addEventListener("submit", submitForm);