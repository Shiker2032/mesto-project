import {setPopupEventListeners} from "../../src/components/modal"
import {createCard, photoCardsContainer} from "../../src/components/card.js"
import { togglePopup, findActivePopup } from '../../src/components/modal';
import {enableValidation, validationconfig} from '../../src/components/validate.js'

import "../pages/index.css";
import "../components/api.js"

const addCardForm = document.forms.card_edit_form;
 const profileForm = document.forms.profile_edit_form;
const profile = document.querySelector(".profile");
const editbutton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector("#popup-profile-edit");
const nameInput = addCardForm.querySelector("#card-name-input");
const urlInput = addCardForm.querySelector("#card-url-input");
const submitCardBtn = addCardForm.querySelector("#submit-card-btn");
const newName = profileForm.querySelector("[id='user-name-input']");
const newActivity = profileForm.querySelector("[id='user-activity-input']");
export const oldName = profile.querySelector(".profile__title");
export const oldActivity = profile.querySelector(".profile__subtitle");

import { createCardAPI, loadCards, updateProfile, loadProfile } from "../components/api.js";

function submitCard(event) {
	event.preventDefault();
	const cardUrl = urlInput.value;
	const cardName = nameInput.value;
	const popup = findActivePopup();	
	togglePopup(popup);
	addCardForm.reset();
	submitCardBtn.classList.add("form__button_disabled");
	submitCardBtn.disabled = true;
	createCardAPI(cardName, cardUrl);	
}

export function renderForm() {
	newName.value = oldName.textContent;
	newActivity.value = oldActivity.textContent;    
}

function submitForm(event) {
	event.preventDefault();
	updateProfile(newName.value, newActivity.value);
	loadProfile();
	togglePopup(popupProfile)
}

addCardForm.addEventListener("submit", submitCard);
editbutton.addEventListener("click", renderForm);
profileForm.addEventListener("submit", submitForm);


setPopupEventListeners();
renderForm();
enableValidation(validationconfig);
//-----------------------------------------------------------------------------------------API-------------------------------------------------------------------------
