


import {profileForm, submitForm, addCardForm, togglePopup,
	submitCard, editbutton, popupProfile, profileCloseButton, addButton, popupCard, cardCloseButton, ImageContainerCloseBtn, renderForm, popupImageContainer }
	 from '../components/modal.js'

profileForm.addEventListener("submit", submitForm);
addCardForm.addEventListener("submit", submitCard);
editbutton.addEventListener("click", () => togglePopup(popupProfile));
profileCloseButton.addEventListener("click", () => togglePopup(popupProfile));
addButton.addEventListener("click", () => togglePopup(popupCard));
cardCloseButton.addEventListener("click", () => togglePopup(popupCard));
ImageContainerCloseBtn.addEventListener("click", () => togglePopup(popupImageContainer));
editbutton.addEventListener("click", renderForm);
renderForm();	


import {enableValidation, validationconfig} from '../components/validate.js'
enableValidation(validationconfig);

import {initial} from '../components/card.js';
initial();

import "../src/index.css";


