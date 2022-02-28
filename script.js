

//------------------------------------ Реакция попапов на нажатия ---------------------------------------------------

function findActivePopup () {
	return document.querySelector(".popup_state_visible");
}

// Закрытие по клику на оверлей
overlay.addEventListener('click', () => {
	const popup = findActivePopup();
	togglePopup(popup);
})

// Закрытие по нажатию Escape
document.addEventListener('keydown', (evt) => {
	const popup = findActivePopup();
	if ((evt.key === "Escape") && (popup != null)) {
		togglePopup(popup);
	}
})

import {profileForm, submitForm, addCardForm, togglePopup,
	submitCard, editbutton, popupProfile, profileCloseButton, addButton, popupCard, cardCloseButton, ImageContainerCloseBtn, renderForm } from './modal.js'

profileForm.addEventListener("submit", submitForm);
addCardForm.addEventListener("submit", submitCard);
editbutton.addEventListener("click", () => togglePopup(popupProfile));
profileCloseButton.addEventListener("click", () => togglePopup(popupProfile));
addButton.addEventListener("click", () => togglePopup(popupCard));
cardCloseButton.addEventListener("click", () => togglePopup(popupCard));
ImageContainerCloseBtn.addEventListener("click", () => togglePopup(popupImageContainer));
editbutton.addEventListener("click", renderForm);



import {enableValidation, validationconfig} from './validate.js'
enableValidation(validationconfig);

import {initial} from './card.js';
initial();

renderForm();	
