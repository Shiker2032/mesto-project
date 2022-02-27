const profile = document.querySelector(".profile");
const profileCloseButton = document.querySelector("[id='profile-form-close']");
const popupProfile = document.querySelector("#popup-profile-edit");
const profileForm = document.forms.profile_edit_form;
const addCardForm = document.forms.card_edit_form;
const newName = profileForm.querySelector("[id='user-name-input']");
const newActivity = profileForm.querySelector("[id='user-activity-input']");
const oldName = profile.querySelector(".profile__title");
const oldActivity = profile.querySelector(".profile__subtitle");

const editbutton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupCard = document.querySelector("[id='popup-card']");
const cardCloseButton = document.querySelector("[id='card-form-close']");
const popupCardCloseBtn = document.querySelector("#popup-image__close-button");
const ImageContainerCloseBtn = document.querySelector("#popup-image__close-button");
const popupImageContainer = document.querySelector("#popup-image-container");
const popupTitle = popupImageContainer.querySelector(".popup-image__title");
const popupImage = document.querySelector(".popup-image__image");
const photoCardElement = document.querySelector("#photo-card-template").content.querySelector(".photo-card");
const photoCardsContainer = document.querySelector(".photo-cards");
const nameInput = addCardForm.querySelector("#card-name-input");
const urlInput = addCardForm.querySelector("#card-url-input");

const overlay = document.querySelector('.overlay');

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
		popupImage.src = card.src;
		popupTitle.textContent = card.alt;
		popupImage.alt = card.alt;
		togglePopup(popupImageContainer);
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
	
	 initialCards.forEach((element) => {
		const photoCardElement =  createCard(element.name, element.link);
		photoCardsContainer.append(photoCardElement);
	 })		
	}
	
function createCard(cardName, cardUrl) {
	const photoCardEl = photoCardElement.cloneNode(true);
	const imageElement = photoCardEl.querySelector(".photo-card__image");
	const imageTitleElement = photoCardEl.querySelector(".photo-card__title");
	imageTitleElement.textContent = cardName;
	imageElement.alt = cardName;
	imageElement.src = cardUrl;
	addCardFunctions(photoCardEl);
	return photoCardEl;	
}

function togglePopup(popup) {
	popup.classList.toggle("popup_state_visible");
	overlay.classList.toggle('overlay_visible');
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
	const cardName = nameInput.value;
	const cardUrl = urlInput.value;
	addCardForm.reset();
 
	photoCardsContainer.prepend(createCard(cardName, cardUrl));	
}

initial();
profileForm.addEventListener("submit", submitForm);
editbutton.addEventListener("click", () => togglePopup(popupProfile));
editbutton.addEventListener("click", renderForm);
profileCloseButton.addEventListener("click", () => togglePopup(popupProfile));
addCardForm.addEventListener("submit", submitCard);
addButton.addEventListener("click", () => togglePopup(popupCard));
cardCloseButton.addEventListener("click", () => togglePopup(popupCard));
ImageContainerCloseBtn.addEventListener("click", () => togglePopup(popupImageContainer));


//------------------------------------ Реакция попапов на нажатия ---------------------------------------------------

function findActivePopup () {
	return document.querySelector(".popup_state_visible");
}

// Закрытие по клику на оверлей
overlay.addEventListener('click', () => {
	const popup = findActivePopup();
	togglePopup(popup);
})

// Закрытие по нажатию Escape
document.addEventListener('keydown', (evt) => {
	const popup = findActivePopup();
	if ((evt.key === "Escape") && (popup != null)) {
		togglePopup(popup);
	}
})

//----------------------------------------- Валидация форм -------------------------------------------------------------

const validationconfig = {
	formSelector: '.form',
	inputSelector: '.form__item',
	buttonSelector: '.form__button',
	buttonDisableClass: 'form__button_disabled',
	errorClass: 'input__error_visible',
	inputErrorClass : 'input__element_invalid'
}

 function hideInputError(inputElement, errorElement, config) {
	inputElement.classList.remove(config.inputErrorClass);
	errorElement.classList.remove(config.errorClass);
	errorElement.textContent = '';
 }

 function showInputError(inputElement, errorElement, errorMessage, config) {
	inputElement.classList.add(config.inputErrorClass);
	errorElement.classList.add(config.errorClass);
	errorElement.textContent = errorMessage;
 }

 function disableButton (buttonElement, config) {
	 buttonElement.classList.add(config.buttonDisableClass);
	 buttonElement.disabled = true;
 }

 function enableButton (buttonElement, config) {
	buttonElement.classList.remove(config.buttonDisableClass);
	buttonElement.disabled = false;
}

function hasInvalidInput (inputList) {
	return inputList.some((inputElement) => {
		return inputElement.validity.valid === false;
	})
}

 function toggleButtonState (formElement, inputList, config) {
	 const buttonElement = formElement.querySelector(config.buttonSelector);

	 if (hasInvalidInput(inputList)) {
		 disableButton(buttonElement, config);
	 } else {
		 enableButton(buttonElement, config)
	 }
 }

function checkInputValidity (formElement, inputElement, config) {
	const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
	if (inputElement.validity.valid) {
		hideInputError(inputElement, errorElement, config);
	} else {
		showInputError(inputElement, errorElement, inputElement.validationMessage, config);
	}
}

function setEventListeners (formElement, config) {
	const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			// Проверка валидации этого инпута
			checkInputValidity(formElement, inputElement, config);
			// Проверять состояние кнопки сабмита			
			toggleButtonState(formElement, inputList, config);
		});
		toggleButtonState(formElement, inputList, config);
	});
}

function enableValidation (config) {
	const formElements = Array.from(document.querySelectorAll(validationconfig.formSelector));	

	formElements.forEach((formElement) => {
		formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();			
		});
		setEventListeners(formElement, config);
	});
};

enableValidation(validationconfig);