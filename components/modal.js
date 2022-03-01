const profileForm = document.forms.profile_edit_form;
const profile = document.querySelector(".profile");
const profileCloseButton = document.querySelector("[id='profile-form-close']");
const popupProfile = document.querySelector("#popup-profile-edit");
const addCardForm = document.forms.card_edit_form;
const newName = profileForm.querySelector("[id='user-name-input']");
const newActivity = profileForm.querySelector("[id='user-activity-input']");
const oldName = profile.querySelector(".profile__title");
const oldActivity = profile.querySelector(".profile__subtitle");
const editbutton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupCard = document.querySelector("[id='popup-card']");
const cardCloseButton = document.querySelector("[id='card-form-close']");
const popupImageContainer = document.querySelector("#popup-image-container");
const ImageContainerCloseBtn = document.querySelector("#popup-image__close-button");
const nameInput = addCardForm.querySelector("#card-name-input");
const urlInput = addCardForm.querySelector("#card-url-input");
const overlay = document.querySelector('#overlay');

import { photoCardsContainer, createCard } from "./card.js";

export function togglePopup(popup) {
	popup.classList.toggle("popup_state_visible");
	overlay.classList.toggle('overlay_visible');
}

function findActivePopup () {
	return document.querySelector(".popup_state_visible");
}

overlay.addEventListener('click', () => {
	const popup = findActivePopup();
	togglePopup(popup);
})

document.addEventListener('keydown', (evt) => {
	const popup = findActivePopup();
	if ((evt.key === "Escape") && (popup != null)) {
		togglePopup(popup);
	}
});

function renderForm() {
	newName.value = oldName.textContent;
	newActivity.value = oldActivity.textContent;
}

function submitForm(event) {
	event.preventDefault();
	oldName.textContent = newName.value;
	oldActivity.textContent = newActivity.value;
	togglePopup(popupProfile)
}

function submitCard(event) {
	const cardUrl = urlInput.value;
	const cardName = nameInput.value;

	event.preventDefault();	
	addCardForm.reset(); 
	photoCardsContainer.prepend(createCard(cardName, cardUrl));	
}

export { profileForm, submitForm, addCardForm, 
	submitCard, editbutton, popupProfile, profileCloseButton, addButton, popupCard, cardCloseButton, ImageContainerCloseBtn, renderForm, popupImageContainer 
  } 