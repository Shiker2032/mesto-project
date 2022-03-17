
import { changeAvatarAPI} from "./api.js";

const profileCloseButton = document.querySelector("[id='profile-form-close']");
const popupProfile = document.querySelector("#popup-profile-edit");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupCard = document.querySelector("[id='popup-card']");
const cardCloseButton = document.querySelector("[id='card-form-close']");
const popupImageContainer = document.querySelector("#popup-image-container");
const imageContainerCloseBtn = document.querySelector("#popup-image__close-button");
const editAvatarForm = document.forms.profile_avatar_edit_form;
const popupAvatarEdit = document.querySelector('#popup-avatar-edit');
const editAvatarElement = document.querySelector(".profile__avatar");
const closeAvatarForm = document.querySelector('#avatar-form-close');
const editAvatarUrl = editAvatarForm.querySelector('#avatar-url-input');
const submitAvatarBtn = editAvatarForm.querySelector('#submit-avatar-btn');

function openPopup (popup) {
	document.addEventListener('keydown', closeByEsc);
	popup.addEventListener('click', closeByClick);
	popup.classList.add('popup_state_visible');
}

function closePopup (popup) {
	document.removeEventListener('keydown', closeByEsc);
	popup.removeEventListener('click', closeByClick);
	popup.classList.remove('popup_state_visible');
}

function findActivePopup () {
	return document.querySelector(".popup_state_visible");
}

function closeByEsc (evt) {
	const popup = findActivePopup(); 
	if ((evt.key === "Escape") && (popup != null)) { 
			closePopup(popup);		
	}
}

function closeByClick (evt) {
	if (evt.target.classList.contains('popup')) closePopup(evt.target);
}

function setPopupEventListeners () {
	editButton.addEventListener("click", () => openPopup(popupProfile));
	profileCloseButton.addEventListener("click", () => closePopup(popupProfile));
	addButton.addEventListener("click", () => openPopup(popupCard));
	cardCloseButton.addEventListener("click", () => closePopup(popupCard));
	imageContainerCloseBtn.addEventListener("click", () => closePopup(popupImageContainer));
	closeAvatarForm.addEventListener("click", () => closePopup(popupAvatarEdit));
}

editAvatarElement.addEventListener('click', () => openPopup(popupAvatarEdit));

editAvatarForm.addEventListener('submit', (evt) => {
	evt.preventDefault();	
	changeAvatarAPI(editAvatarUrl.value).then(() => {
		submitAvatarBtn.textContent = 'Сохранить...';
		editAvatarElement.src = editAvatarUrl.value
		editAvatarForm.reset();
		submitAvatarBtn.disabled = true;
		submitAvatarBtn.classList.add('form__button_disabled');		
	})			
	.catch((error) => console.log(error))
	.finally(() => {
		submitAvatarBtn.textContent = 'Сохранить'
			
	})
})

export {setPopupEventListeners, findActivePopup, popupCard, openPopup, closePopup}