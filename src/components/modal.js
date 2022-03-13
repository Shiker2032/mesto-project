import { changeAvatarAPI} from "./api.js";

const profileCloseButton = document.querySelector("[id='profile-form-close']");
const popupProfile = document.querySelector("#popup-profile-edit");
const editbutton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupCard = document.querySelector("[id='popup-card']");
const cardCloseButton = document.querySelector("[id='card-form-close']");
const popupImageContainer = document.querySelector("#popup-image-container");
const imageContainerCloseBtn = document.querySelector("#popup-image__close-button");
const editAvatarForm = document.forms.profile_avatar_edit_form;
const popupAvatarEdit = document.querySelector('#popup-avatar-edit');
const editAvatarIElement = document.querySelector(".profile__avatar");
const closeAvatarForm = document.querySelector('#avatar-form-close');
const editAvatarIBtn = document.querySelector('.profile__edit-avatar-button');
const editAvatarUrl = editAvatarForm.querySelector('#avatar-url-input');



editAvatarForm.addEventListener('submit', (evt) => {
	evt.preventDefault();	
	changeAvatarAPI (editAvatarUrl.value);
	editAvatarIElement.src = editAvatarUrl.value;	
})

editAvatarIElement.addEventListener('click', () => togglePopup(popupAvatarEdit));

editAvatarIElement.addEventListener('mouseenter', () => {
	editAvatarIBtn.classList.add('profile__edit-avatar-button_visible');	
	editAvatarIElement.style.opacity = "0.5";
})
editAvatarIElement.addEventListener('mouseleave', () => {
	editAvatarIBtn.classList.remove('profile__edit-avatar-button_visible');	
	editAvatarIElement.style.opacity = "1";	
})

function togglePopup(popup) {
	if (popup.classList.contains('popup_state_visible')){
		document.removeEventListener('keydown', closeByEsc);
		popup.removeEventListener('click', closeByClick);
	} else {
		document.addEventListener('keydown', closeByEsc);
		popup.addEventListener('click', closeByClick);
	}
	popup.classList.toggle("popup_state_visible"); 	
}

function findActivePopup () {
	return document.querySelector(".popup_state_visible");
}

function closeByEsc (evt) {
	const popup = findActivePopup(); 
	if ((evt.key === "Escape") && (popup != null)) { 
			togglePopup(popup);		
	}
}

function closeByClick (evt) {
	const popup = findActivePopup();
	if (evt.target.classList.contains('popup')) togglePopup(popup);
}

function setPopupEventListeners () {
	editbutton.addEventListener("click", () => togglePopup(popupProfile));
	profileCloseButton.addEventListener("click", () => togglePopup(popupProfile));
	addButton.addEventListener("click", () => togglePopup(popupCard));
	cardCloseButton.addEventListener("click", () => togglePopup(popupCard));
	imageContainerCloseBtn.addEventListener("click", () => togglePopup(popupImageContainer));
	closeAvatarForm.addEventListener("click", () => togglePopup(popupAvatarEdit));
}

export {setPopupEventListeners, togglePopup, findActivePopup}