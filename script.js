const profile = document.querySelector(".profile");
const profileCloseButton = document.querySelector("[id='profile-form-close']");
const popupProfile = document.querySelector("#popup-profile-edit");
const form = popupProfile.querySelector(".form");
const newName = form.querySelector("[id='user-name-input']");
const newActivity = form.querySelector("[id='user-activity-input']");
const oldName = profile.querySelector(".profile__title");
const oldActivity = profile.querySelector(".profile__subtitle");
const AddCardForm = document.querySelector("[name='card-edit-form']");
const editbutton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupCard = document.querySelector("[id='popup-card']");
const cardCloseButton = document.querySelector("[id='card-form-close']");
const popupCardCloseBtn = document.querySelector("#popup-image__close-button");
const popupImageContainer = document.querySelector("#popup-image-container");
const ImageContainerCloseBtn = document.querySelector("#popup-image__close-button")
const photoCards = document.querySelector(".photo-cards");

function addCardFunctions(photoCardElement) {
	const deleteButton = photoCardElement.querySelector(".photo-card__delete-button");
	deleteButton.addEventListener("click", function (event) {
		event.target.closest(".photo-card").remove();
	})
	const likeButton = photoCardElement.querySelector(".photo-card__like-button");
	likeButton.addEventListener("click", function () {
		likeButton.classList.toggle("like-button_state_liked");
	})
	const cardPop = photoCardElement.querySelector(".photo-card__image");
	cardPop.classList.add("button");
	cardPop.addEventListener("click", function (event) {
		const card = event.target;
		const popup = document.querySelector("#popup-image-container");
		const popupTitle = popup.querySelector(".popup-image__title");
		const popupImage = document.querySelector(".popup-image__image");
		popupImage.src = card.src;
		popupTitle.textContent = card.alt;
		popupImage.alt = card.alt;
		togglePopup(popup);
	})
}

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
	
	 initialCards.forEach((element) =>{
		let photoCardElement =  createCard(element.name, element.link);
		document.querySelector(".photo-cards").append(photoCardElement);
	 })		
	}
	
function createCard(cardName, cardUrl) {	
	const photoCardTemplate = document.querySelector("#photo-card-template").content;
	const photoCardElement = photoCardTemplate.querySelector(".photo-card").cloneNode(true);
	const imageElement = photoCardElement.querySelector(".photo-card__image");
	const imageTitleElement = photoCardElement.querySelector(".photo-card__title");
	imageTitleElement.textContent = cardName;
	imageElement.alt = cardName;
	imageElement.src = cardUrl;
	addCardFunctions(photoCardElement);
	return photoCardElement;	
}

function togglePopup(popup) {
	popup.classList.toggle("popup_state_visible");
}

function renderForm() {
	newName.value = oldName.textContent;
	newActivity.value = oldActivity.textContent;
}

function submitForm(event) {
	event.preventDefault();
	oldName.textContent = newName.value;
	oldActivity.textContent = newActivity.value;
	togglePopup(popupProfile)
}

function submitCard(event) {
	event.preventDefault();	
	const photoCardsContainer = document.querySelector(".photo-cards");
	const nameInput = AddCardForm.querySelector("#card-name-input");
	const urlInput = AddCardForm.querySelector("#card-url-input")
	const cardName = nameInput.value;
	const cardUrl = urlInput.value;
  nameInput.value="";
	urlInput.value = "";
	photoCardsContainer.prepend(createCard(cardName, cardUrl));	
}

initial();
form.addEventListener("submit", submitForm);
editbutton.addEventListener("click", () => togglePopup(popupProfile));
editbutton.addEventListener("click", renderForm);
profileCloseButton.addEventListener("click", () => togglePopup(popupProfile));
AddCardForm.addEventListener("submit", submitCard);
addButton.addEventListener("click", () => togglePopup(popupCard));
cardCloseButton.addEventListener("click", () => togglePopup(popupCard));
ImageContainerCloseBtn.addEventListener("click", () => togglePopup(popupImageContainer));