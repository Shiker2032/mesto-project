import {openPopup} from "../components/modal.js"
import {deleteCardAPI, putLikeAPI, deleteLikeAPI} from "./api.js";

const photoCardsContainer = document.querySelector(".photo-cards");
const popupImageContainer = document.querySelector("#popup-image-container");
const popupImageTitle = popupImageContainer.querySelector(".popup-image__title");
const popupImage = document.querySelector(".popup-image__image");
const storedUserData = {};

class CardClass {
	constructor (data, isNew, isLiked) {
		this.name = data.name,
		this.link = data.link,
		this._id = data._id,
		this.owner_id = data.owner_id,
		this.likes = data.likes,
		this.isNew = isNew,
		this.isLiked = isLiked;
	}
	_getElement () {
		const cardElement = document
		.querySelector("#photo-card-template")
		.content.querySelector(".photo-card")
		.cloneNode(true);
		return cardElement;
	}
	_generate () {
		const photoCardEl = this._getElement();
		
		this._element = photoCardEl;
		this._setEventListeners();

		const likeButtonEl = photoCardEl.querySelector(".photo-card__like-button");		
		const imageElement = photoCardEl.querySelector(".photo-card__image");
		const imageTitleElement = photoCardEl.querySelector(".photo-card__title");
		const likeCounterElement = photoCardEl.querySelector('.photo-card__like-counter');

		imageTitleElement.textContent = this.name;
		imageElement.alt = this.name;
		imageElement.src = this.link;
		photoCardEl.id = this._id;
		photoCardEl.owner = this.owner_id;
		likeCounterElement.textContent = this.likes.length;
		photoCardEl.isLiked = this.isLiked;

		if (this.isLiked) likeButtonEl.classList.toggle("like-button_state_liked");
		addCardFunctions(photoCardEl);	
		if (photoCardEl.owner != storedUserData.id) {
			photoCardEl.querySelector('.photo-card__delete-button').remove();
		}
		if (this.isNew) {
			photoCardsContainer.prepend(photoCardEl);
		} else {
			photoCardsContainer.append(photoCardEl);
		}
	}
	_handleOpenPopup () {			
			popupImage.src = this.link;
			popupImageTitle.textContent = this.name;
			popupImage.alt = this.name;	
			openPopup(popupImageContainer);
	}
	_handleLike () {		
			const likeCounterElement = this._element.querySelector('.photo-card__like-counter');
			const likeButtonEl = this._element.querySelector(".photo-card__like-button");			
			if (!this.isLiked) {					
				putLikeAPI(this._id).then((res) => {
					likeCounterElement.textContent = res.likes.length;					
					likeButtonEl.classList.add("like-button_state_liked");
					this.isLiked = true;					
				})
				.catch((error) => console.log(error));
			} else {
				deleteLikeAPI(this._id).then((res) => {
					likeCounterElement.textContent = res.likes.length
					likeButtonEl.classList.remove("like-button_state_liked");				
					this.isLiked = false;					
				})
				.catch((error) => console.log(error))
			}
		
	}
	_setEventListeners () {
		this._element.querySelector('.photo-card__image').addEventListener('click', () => {
			this._handleOpenPopup();
		})
		this._element.querySelector('.photo-card__like-button').addEventListener("click", () => {
			this._handleLike();
		})
	}
}

function addCardFunctions(photoCardElement) {	
	const deleteButton = photoCardElement.querySelector(".photo-card__delete-button");	
	deleteButton.addEventListener("click", function () {
		deleteCardAPI(photoCardElement.id).then(() => photoCardElement.remove())
		.catch((error) => console.log(error));
	});	
}

export {CardClass, photoCardsContainer, storedUserData};