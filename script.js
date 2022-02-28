


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
renderForm();	


import {enableValidation, validationconfig} from './validate.js'
enableValidation(validationconfig);

import {initial} from './card.js';
initial();


