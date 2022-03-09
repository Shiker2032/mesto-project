import {togglePopup} from "../components/modal.js"
import { deleteCardAPI } from "./api.js";

const photoCardElement = document.querySelector("#photo-card-template").content.querySelector(".photo-card");
const photoCardsContainer = document.querySelector(".photo-cards");
const popupImageContainer = document.querySelector("#popup-image-container");
const popupImageTitle = popupImageContainer.querySelector(".popup-image__title");
const popupImage = document.querySelector(".popup-image__image");
	
 function createCard(cardName, cardUrl, cardId, ownerId) {
	const photoCardEl = photoCardElement.cloneNode(true);
	const imageElement = photoCardEl.querySelector(".photo-card__image");
	const imageTitleElement = photoCardEl.querySelector(".photo-card__title");
	
	imageTitleElement.textContent = cardName;
	imageElement.alt = cardName;
	imageElement.src = cardUrl;
	photoCardEl.id = cardId;
	photoCardEl.owner = ownerId;
	
	addCardFunctions(photoCardEl);
	if (photoCardEl.owner !="a9989f08a11db0ae0dffbcf2") {
		photoCardEl.querySelector('.photo-card__delete-button').remove();
	}
	return photoCardEl;	
}

function addCardFunctions(photoCardElement) {
	const deleteButton = photoCardElement.querySelector(".photo-card__delete-button");
	deleteButton.addEventListener("click", function (event) {
		deleteCardAPI(event.target);		
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
		popupImageTitle.textContent = card.alt;
		popupImage.alt = card.alt;
		togglePopup(popupImageContainer);
	});
}

export {photoCardsContainer, createCard};