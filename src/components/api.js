import {loadProfile } from '../pages/index.js' 
import {createCard} from './card.js';

const config = {
  urlCards: 'https://nomoreparties.co/v1/plus-cohort7/cards',
  urlProfile: 'https://nomoreparties.co/v1/plus-cohort7/users/me',
  urlLikes :'https://nomoreparties.co/v1/plus-cohort7/cards/likes',
  token: 'd5427cfe-b46d-4e99-8eaf-124e3b1bb259'
}

const userInfo = [];

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

class userInfoClass {
  constructor (user_id) {
    this.user_id = user_id;
  }}


  function loadProfileAPI () {
    fetch (config.urlProfile, {
      headers: {
        authorization: config.token
      }
    })
    .then (res => {
      if (res.ok) return res.json();
      return Promise.reject(`Reject: ${res.status}`);
    })   
     .then (json => {    
      const user = new userInfoClass(json._id);
      userInfo.push(user);
      loadProfile (json);       
     })
     .catch((err) => {
       console.log(err);
     }) 
    }    

function loadCards () {
   fetch (config.urlCards, {
    headers: {
      authorization: config.token,
      'content-type': 'application/JSON'
    }
  })
  .then (res => {
    if (res.ok) return res.json();
    return Promise.reject(`Reject: ${res.status}`);
  })
  .then (json => {
    json.forEach((cardElement) => {  
      const isLiked = cardElement.likes.some((likeEl) => likeEl._id == userInfo[0].user_id);      
      const cardObj = new cardClass (cardElement.name, cardElement.link, cardElement._id, cardElement.owner._id, cardElement.likes, false, isLiked);      
     createCard(cardObj);         
    })
  })
  .catch ((err) => console.log(err));
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
  .then(res => {
    if (res.ok) return res.json();
    return Promise.reject(`Reject: ${res.status}`);
  })
  .then(json=>loadProfileAPI())
  .catch((err) => console.log(err));  
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
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Reject: ${res.status}`);
    })
    .then(cardElement => {
      const cardObj = new cardClass (cardElement.name, cardElement.link, cardElement._id, cardElement.owner._id, cardElement.likes, true);
      createCard(cardObj);       
    })
    .catch((err) => console.log(err));
  }

function deleteCardAPI (card_id) { 
  fetch(`${config.urlCards}/${card_id}` , {
    method: "DELETE",
    headers: {
      authorization: config.token
    },    
  })
  .then (res => {
    if (res.ok) return res.json();
    return Promise.reject(`Reject: ${res.status}`);
  })
  .then (json => console.log(json))
  .catch((err) => console.log(err));

}

function putLikeAPI (card_id) {
  fetch (`${config.urlLikes}/${card_id}`, {
    method: 'PUT',
    headers: {
      authorization: config.token
    },    
  })
  .then(res => {
    if (res.ok) return res.json();
    return Promise.reject(`Reject: ${res.status}`);
  })
  .then(json => console.log(json))
  .catch((err) => console.log(err));
}

function deleteLikeAPI (card_id) {
  fetch (`${config.urlLikes}/${card_id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.token
    },    
  })
  .then(res => {
    if (res.ok) return res.json();
    return Promise.reject(`Reject: ${res.status}`);
  })
  .then(json => console.log(json))
  .catch((err) => console.log(err));
}

function changeAvatarAPI (image_url) {
  fetch(`${config.urlProfile}/avatar` , {
  method: 'PATCH',
  headers: {
    authorization: config.token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    avatar: `${image_url}`
  })
})
.then(res=> {
  if (res.ok) return res.json();
  return Promise.reject(`Reject: ${res.status}`);
})
.then(json => console.log(json))
.catch((err) => console.log(err));
}

loadProfileAPI();
loadCards();

export {createCardAPI, deleteCardAPI, loadCards, updateProfile, loadProfile, putLikeAPI, changeAvatarAPI, deleteLikeAPI, loadProfileAPI}