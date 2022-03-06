import {setPopupEventListeners} from "../../src/components/modal"
import {createCard, photoCardsContainer} from "../../src/components/card.js"
import { togglePopup } from '../../src/components/modal';
import {enableValidation, validationconfig} from '../../src/components/validate.js'
import "../pages/index.css";

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
const oldName = profile.querySelector(".profile__title");
const oldActivity = profile.querySelector(".profile__subtitle");

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
	
	initialCards.forEach((element) => {
		const photoCardElement =  createCard(element.name, element.link);
		photoCardsContainer.append(photoCardElement);
	});
}

function submitCard(event) {
	const cardUrl = urlInput.value;
	const cardName = nameInput.value;
	const popup = findActivePopup();
	event.preventDefault();	
	togglePopup(popup);
	addCardForm.reset();
	submitCardBtn.classList.add("form__button_disabled");
	submitCardBtn.disabled = true;
	photoCardsContainer.prepend(createCard(cardName, cardUrl));	
}

export function renderForm() {
	newName.value = oldName.textContent;
	newActivity.value = oldActivity.textContent;    
}

function submitForm(event) {
	event.preventDefault();
	oldName.textContent = newName.value;
	oldActivity.textContent = newActivity.value;
	togglePopup(popupProfile)
}

addCardForm.addEventListener("submit", submitCard);
editbutton.addEventListener("click", renderForm);
profileForm.addEventListener("submit", submitForm);

initial();
setPopupEventListeners();
renderForm();
enableValidation(validationconfig);