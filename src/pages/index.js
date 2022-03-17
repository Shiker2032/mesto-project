import "../pages/index.css";
import "../components/api.js"
import {setPopupEventListeners} from "../../src/components/modal"
import {closePopup, popupCard } from '../../src/components/modal';
import {enableValidation, validationConfig} from '../../src/components/validate.js'
import { createCardAPI, updateProfileAPI, getUserDataAPI, loadCardsAPI } from "../components/api.js";
import {createCard} from '../../src/components/card.js';

const addCardForm = document.forms.card_edit_form;
const profileForm = document.forms.profile_edit_form;
const profile = document.querySelector(".profile");
const profileAvatar = document.querySelector('.profile__avatar');
const editbutton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector("#popup-profile-edit");
const nameInput = addCardForm.querySelector("#card-name-input");
const urlInput = addCardForm.querySelector("#card-url-input");
const submitCardBtn = addCardForm.querySelector("#submit-card-btn");
const newName = profileForm.querySelector("[id='user-name-input']");
const newActivity = profileForm.querySelector("[id='user-activity-input']");
const oldName = profile.querySelector(".profile__title");
const oldActivity = profile.querySelector(".profile__subtitle");

class CardClass {
	constructor (name, link, _id, owner_id, likes, isNew, isLiked) {
		this.name = name,
		this.link = link,
		this._id = _id,
		this.owner_id = owner_id,
		this.likes = likes,
		this.isNew = isNew,
		this.isLiked = isLiked
	}
}

function setProfileData() {
	newName.value = oldName.textContent;
	newActivity.value = oldActivity.textContent;    
}

function updateProfile (profileObj) {
	oldName.textContent = profileObj.name;
	oldActivity.textContent = profileObj.about;
	profileAvatar.src = profileObj.avatar;
}

function submitCard(event) {
	event.preventDefault();
	const cardUrl = urlInput.value;
	const cardName = nameInput.value;

	createCardAPI(cardName, cardUrl)
	.then(cardElement => {
		const cardObj = new CardClass (cardElement.name, cardElement.link, cardElement._id, cardElement.owner._id, cardElement.likes, true, false);
		createCard(cardObj);

		closePopup(popupCard);
		addCardForm.reset();
		submitCardBtn.classList.add("form__button_disabled");
		submitCardBtn.disabled = true;
	})
}

function submitProfile(event) {
	event.preventDefault();
	updateProfileAPI(newName.value, newActivity.value)
	.then(profileData => {
		updateProfile(profileData);
		closePopup(popupProfile);
	})
}

addCardForm.addEventListener("submit", submitCard);
editbutton.addEventListener("click", setProfileData);
profileForm.addEventListener("submit", submitProfile);

setPopupEventListeners();
setProfileData();
enableValidation(validationConfig);

Promise.all([
	getUserDataAPI(),
	loadCardsAPI()
])
.then((values) => {
	const data = {
		userData : values[0],
		cardsData : values[1]		
	}
	return data
})
.then((ServerData) => {
	updateProfile(ServerData.userData);
	ServerData.cardsData.forEach((cardElement) => {
		const isLiked = cardElement.likes.some((likeEl) => likeEl._id == ServerData.userData._id);
		const cardObj = new CardClass (cardElement.name, cardElement.link, cardElement._id, cardElement.owner._id, cardElement.likes, false, isLiked);
		createCard(cardObj);
	})
})