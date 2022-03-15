import "../pages/index.css";
import "../components/api.js"
import {setPopupEventListeners} from "../../src/components/modal"
import { togglePopup, popupCard } from '../../src/components/modal';
import {enableValidation, validationconfig} from '../../src/components/validate.js'
import { createCardAPI, updateProfileAPI, loadProfileAPI, loadCardsAPI } from "../components/api.js";
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

class userInfoClass {
  constructor (user_id) {
    this.user_id = user_id;
  }}

	class cardClass {
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

	const userInfo = [];

function setProfileData() {
	newName.value = oldName.textContent;
	newActivity.value = oldActivity.textContent;    
}

function DrawProfile (profileObj) {
	oldName.textContent = profileObj.name;
	oldActivity.textContent = profileObj.about;
	profileAvatar.src = profileObj.avatar;
}

function submitCard(event) {
	event.preventDefault();
	const cardUrl = urlInput.value;
	const cardName = nameInput.value;
	togglePopup(popupCard);
	addCardForm.reset();
	submitCardBtn.classList.add("form__button_disabled");
	submitCardBtn.disabled = true;
	createCardAPI(cardName, cardUrl)
	.then(cardElement => {
		const cardObj = new cardClass (cardElement.name, cardElement.link, cardElement._id, cardElement.owner._id, cardElement.likes, true, false);
		createCard(cardObj);		       
	})
}

function submitProfile(event) {
	event.preventDefault();
	updateProfileAPI(newName.value, newActivity.value)
	.then(profileData => {
		DrawProfile(profileData);
		togglePopup(popupProfile);
	})
}

addCardForm.addEventListener("submit", submitCard);
editbutton.addEventListener("click", setProfileData);
profileForm.addEventListener("submit", submitProfile);


loadProfileAPI()
.then(profileData => {
	DrawProfile (profileData); 	 
	const user = new userInfoClass(profileData._id);
	userInfo.push(user);    
})
.then(loadCardsAPI)
.then(cardData => {
	cardData.forEach((cardElement) => {  
		const isLiked = cardElement.likes.some((likeEl) => likeEl._id == userInfo[0].user_id);      
		const cardObj = new cardClass (cardElement.name, cardElement.link, cardElement._id, cardElement.owner._id, cardElement.likes, false, isLiked);      
	 createCard(cardObj);
	})
})


setPopupEventListeners();
setProfileData();
enableValidation(validationconfig);




