const profileCloseButton = document.querySelector("[id='profile-form-close']");
const popupProfile = document.querySelector("#popup-profile-edit");
const editbutton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupCard = document.querySelector("[id='popup-card']");
const cardCloseButton = document.querySelector("[id='card-form-close']");
const popupImageContainer = document.querySelector("#popup-image-container");
const imageContainerCloseBtn = document.querySelector("#popup-image__close-button");

const overlay = document.querySelector('#overlay');

function togglePopup(popup) {
	popup.classList.toggle("popup_state_visible");
	overlay.classList.toggle('overlay_visible');
	document.addEventListener('keydown',  closeByEsc)
}

function findActivePopup () {
	return document.querySelector(".popup_state_visible");
}

function closeByEsc(evt) {
	const popup = findActivePopup(); 
	if ((evt.key === "Escape") && (popup != null)) { 
			togglePopup(popup);
			document.removeEventListener('keydown',  closeByEsc)
	}
}

overlay.addEventListener("click", (evt) => {
	const popup = findActivePopup();
	if (!evt.target.classList.contains('popup')) togglePopup(popup)
})

function setPopupEventListeners () {
editbutton.addEventListener("click", () => togglePopup(popupProfile));
profileCloseButton.addEventListener("click", () => togglePopup(popupProfile));
addButton.addEventListener("click", () => togglePopup(popupCard));
cardCloseButton.addEventListener("click", () => togglePopup(popupCard));
imageContainerCloseBtn.addEventListener("click", () => togglePopup(popupImageContainer));
}

export {setPopupEventListeners, togglePopup}



