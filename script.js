const profile = document.querySelector(".profile");
const popupProfile = document.querySelector("#popup-profile-edit");
const form = popupProfile.querySelector(".form");
const cardForm = document.querySelector("[name='card-edit-form']");
const editbutton = document.querySelector(".profile__edit-button");
const profileCloseButton = document.querySelector("[id='profile-form-close']");
const addButton = document.querySelector(".profile__add-button");
const popupCard = document.querySelector("[id='popup-card']");
const cardCloseButton = document.querySelector("[id='card-form-close']");
const popupCardCloseBtn = document.querySelector("#popup-image__close-button");
const popupImageContainer = document.querySelector("#popup-image-container");
const ImageContainerCloseBtn = document.querySelector("#popup-image__close-button")

function addCardFunctions(photoCardElement) {
	const deleteButton = photoCardElement.querySelector(".photo-card__delete-button");
	deleteButton.addEventListener("click", function (event) {
		event.target.parentNode.remove();
	})
	const likeButton = photoCardElement.querySelector(".photo-card__like-button");
	likeButton.addEventListener("click", function () {
		likeButton.classList.toggle("like-button_state_liked");
	})
	const cardPop = photoCardElement.querySelector(".photo-card__image");//popup-картинка
	cardPop.classList.add("button");
	cardPop.addEventListener("click", function (event) {
		const card = event.target;
		const popup = document.querySelector("#popup-image-container");
		const popupTitle = popup.querySelector(".popup-image__title");
		const popupImage = document.querySelector(".popup-image__image");
		const popupCloseBtn = document.querySelector("#popup-image__close-button");
		
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
	
	for (i = 0; i < initialCards.length; i++) {
		const photoCards = document.querySelector(".photo-cards");
		const photoCardTemplate = document.querySelector("#photo-card-template").content;
		const photoCardElement = photoCardTemplate.querySelector(".photo-card").cloneNode(true);
		const imageElement = photoCardElement.querySelector(".photo-card__image");
		const imageTitleElement = photoCardElement.querySelector(".photo-card__title");
		imageTitleElement.textContent = initialCards[i].name;
		imageElement.src = initialCards[i].link;
		imageElement.alt = initialCards[i].name;
		addCardFunctions(photoCardElement);
		document.querySelector(".photo-cards").append(photoCardElement);
	}
}

function togglePopup(popup) {
	popup.classList.toggle("popup_state_visible");
}

function renderForm() {
	const newName = form.querySelector("[id='user-name-input']");
	const newActivity = form.querySelector("[id='user-activity-input']");
	const oldName = profile.querySelector(".profile__title");
	const oldActivity = profile.querySelector(".profile__subtitle");
	newName.value = oldName.textContent;
	newActivity.value = oldActivity.textContent;
}

function submitForm(event) {
	event.preventDefault();
	const newName = form.querySelector("[id='user-name-input']");
	const newActivity = form.querySelector("[id='user-activity-input']");
	const oldName = profile.querySelector(".profile__title");
	const oldActivity = profile.querySelector(".profile__subtitle");
	oldName.textContent = newName.value;
	oldActivity.textContent = newActivity.value;
	togglePopup(popupProfile)
}

function submitCard(event) {
	event.preventDefault();
	
	const photoCardsContainer = document.querySelector(".photo-cards");
	photoCardsContainer.prepend(createCard());
	
}

function createCard() {
	const cardName = cardForm.querySelector("[id='card-name-input']")
	const cardUrl = cardForm.querySelector("[id='card-url-input']")
	const photoCardTemplate = document.querySelector("#photo-card-template").content;
	const photoCardElement = photoCardTemplate.querySelector(".photo-card").cloneNode(true);
	const imageElement = photoCardElement.querySelector(".photo-card__image");
	const imageTitleElement = photoCardElement.querySelector(".photo-card__title");
	imageElement.alt = cardName.value;
	imageElement.src = cardUrl.value;
	imageTitleElement.textContent = cardName.value;
	
	addCardFunctions(photoCardElement);
	cardName.value = "";
	cardUrl.value = "";	
	return(photoCardElement);
	
	
}

initial();
form.addEventListener("submit", submitForm);
editbutton.addEventListener("click", () => togglePopup(popupProfile));
editbutton.addEventListener("click", renderForm);
profileCloseButton.addEventListener("click", () => togglePopup(popupProfile));
cardForm.addEventListener("submit", submitCard);
addButton.addEventListener("click", () => togglePopup(popupCard));
cardCloseButton.addEventListener("click", () => togglePopup(popupCard));
ImageContainerCloseBtn.addEventListener("click", () => togglePopup(popupImageContainer));

