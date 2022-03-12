import {oldName, oldActivity, newName, newActivity, profileForm } from '../pages/index.js' 
import { createCard} from './card.js'; 

        const my_id = "a9989f08a11db0ae0dffbcf2";

const profileAvatar = document.querySelector('.profile__avatar');

const config = {
  urlCards: 'https://nomoreparties.co/v1/plus-cohort7/cards',
  urlProfile: 'https://nomoreparties.co/v1/plus-cohort7/users/me',
  urlLikes :'https://nomoreparties.co/v1/plus-cohort7/cards/likes',
  token: 'd5427cfe-b46d-4e99-8eaf-124e3b1bb259'
}


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

function loadCards () {
   fetch (config.urlCards, {
    headers: {
      authorization: config.token,
      'content-type': 'application/JSON'
    }
  })
  .then (respnose => respnose.json())
  .then (json => {
    json.forEach((cardElement) => {  
      const isLiked = cardElement.likes.some((likeEl) => likeEl._id == my_id);     
      const cardObj = new cardClass (cardElement.name, cardElement.link, cardElement._id, cardElement.owner._id, cardElement.likes, false, isLiked);      
     createCard(cardObj);         
    })
  })
}

function loadProfile () {
  fetch (config.urlProfile, {
    headers: {
      authorization: config.token
    }
  })
  .then (response => response.json())
   .then (json => {
    oldName.textContent = json.name;
    oldActivity.textContent = json.about
    profileAvatar.src = json.avatar
   }); 
  }

function updateProfile (nameInput, aboutInput) {
  fetch (config.urlProfile, {
    method: 'PATCH',
    headers: {
      authorization: config.token,
      'content-type': 'application/JSON'
    },
    body: JSON.stringify({
      name: nameInput,
      about: aboutInput
    })
  })
  .then(response => response.json())
  .then(json=>loadProfile());  
}

  function createCardAPI (cardName, cardUrl) {
    fetch (config.urlCards, {
      method: 'POST',
      headers: {
        authorization: config.token,
        'content-type': 'application/JSON'
      },
      body: JSON.stringify({
        name: cardName,
        link: cardUrl,    
      })
    })
    .then(response => response.json())
    .then(cardElement => {
      const cardObj = new cardClass (cardElement.name, cardElement.link, cardElement._id, cardElement.owner._id, cardElement.likes, true);
      createCard(cardObj);       
    });    
  }

function deleteCardAPI (card_id) { 
  fetch(`https://nomoreparties.co/v1/plus-cohort7/cards/${card_id}` , {
    method: "DELETE",
    headers: {
      authorization: config.token
    },    
  })
  .then (res => res.json())
  .then (json => console.log(json)); 
  
}

function putLikeAPI (card_id) {
  fetch (`https://nomoreparties.co/v1/plus-cohort7/cards/likes/${card_id}`, {
    method: 'PUT',
    headers: {
      authorization: config.token
    },    
  })
  .then(res => res.json())
  .then(json => console.log(json))
}

function deleteLikeAPI (card_id) {
  fetch (`https://nomoreparties.co/v1/plus-cohort7/cards/likes/${card_id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.token
    },    
  })
  .then(res => res.json())
  .then(json => console.log(json))
}

function changeAvatarAPI (image_url) {
  fetch('https://nomoreparties.co/v1/plus-cohort7/users/me/avatar ', {
  method: 'PATCH',
  headers: {
    authorization: config.token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    avatar: `${image_url}`
  })
}) 
  .then(res=> res.json())
  .then(json => console.log(json))

}

function getUserInfoAPI () {
  fetch ('https://nomoreparties.co/v1/plus-cohort7/users/me/', {
    method: 'GET',
    headers: {
      authorization: config.token
    }
  })
  .then(res => res.json())
}


getUserInfoAPI ();
loadCards();
loadProfile();

export {createCardAPI, deleteCardAPI, loadCards, updateProfile, loadProfile, putLikeAPI, changeAvatarAPI, deleteLikeAPI}