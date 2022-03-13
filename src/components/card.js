import {togglePopup} from "../components/modal.js"
import { deleteCardAPI, putLikeAPI, deleteLikeAPI} from "./api.js"; 

const photoCardElement = document.querySelector("#photo-card-template").content.querySelector(".photo-card");
const photoCardsContainer = document.querySelector(".photo-cards");
const popupImageContainer = document.querySelector("#popup-image-container");
const popupImageTitle = popupImageContainer.querySelector(".popup-image__title");
const popupImage = document.querySelector(".popup-image__image");

function createCard(cardObj) {
	const photoCardEl = photoCardElement.cloneNode(true);
	const likeButton = photoCardEl.querySelector(".photo-card__like-button");
	const imageElement = photoCardEl.querySelector(".photo-card__image");
	const imageTitleElement = photoCardEl.querySelector(".photo-card__title");
	const likeCounterElement = photoCardEl.querySelector('.photo-card__like-counter');
	
	imageTitleElement.textContent = cardObj.name;
	imageElement.alt = cardObj.name;
	imageElement.src = cardObj.link;
	photoCardEl.id = cardObj._id;
	photoCardEl.owner = cardObj.owner_id;
	likeCounterElement.textContent = cardObj.likes.length;	
	photoCardEl.isLiked = cardObj.isLiked;

	if (cardObj.isLiked) likeButton.classList.toggle("like-button_state_liked");
	addCardFunctions(photoCardEl);
	if (photoCardEl.owner !="a9989f08a11db0ae0dffbcf2") {
		photoCardEl.querySelector('.photo-card__delete-button').remove();
	}	
	if (cardObj.isNew) {
		photoCardsContainer.prepend(photoCardEl); 		
	} else {
		photoCardsContainer.append(photoCardEl); 
	}	
}

function addCardFunctions(photoCardElement) {
	const deleteButton = photoCardElement.querySelector(".photo-card__delete-button");
	deleteButton.addEventListener("click", function () {	
		deleteCardAPI(photoCardElement.id);
		photoCardElement.remove();		
	});	

	const likeButton = photoCardElement.querySelector(".photo-card__like-button");
	likeButton.addEventListener("click",  (evt) => {
		const photoCardElement = evt.target.closest(".photo-card");
		const likeCounterElement = photoCardElement.querySelector('.photo-card__like-counter');
		
		if (!photoCardElement.isLiked) {			
			likeCounterElement.textContent = parseInt(likeCounterElement.textContent) + 1;
			putLikeAPI(photoCardElement.id);
			likeButton.classList.toggle("like-button_state_liked");
			photoCardElement.isLiked = true;
		} else {
			likeCounterElement.textContent = parseInt(likeCounterElement.textContent) - 1;
			likeButton.classList.toggle("like-button_state_liked");	
			deleteLikeAPI(photoCardElement.id);
			photoCardElement.isLiked = false;						
		}		
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