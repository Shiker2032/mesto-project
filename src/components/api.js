import {oldName, oldActivity, newName, newActivity} from '../pages/index.js' 
import { createCard, photoCardsContainer } from './card.js'; 

const config = {
  urlCards: 'https://nomoreparties.co/v1/plus-cohort7/cards',
  urlProfile: 'https://nomoreparties.co/v1/plus-cohort7/users/me',
  token: 'd5427cfe-b46d-4e99-8eaf-124e3b1bb259'
}

// fetch('https://nomoreparties.co/v1/plus-cohort7/cards', {
//   headers: {
//     authorization: 'd5427cfe-b46d-4e99-8eaf-124e3b1bb259'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   }); 


  // fetch('https://nomoreparties.co/v1/plus-cohort7/users/me', {
//   method: 'PATCH',
//   headers: {
//     authorization: 'd5427cfe-b46d-4e99-8eaf-124e3b1bb259',
//     'content-type': 'application/JSON'
//   },
//   body: JSON.stringify({
//     name: "Влад Бегунов",
//     about: 'Адепт Веба'
//   })
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   }); 

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
    .then(json => console.log(json))
  }


  function loadCards () {
    return fetch (config.urlCards, {
      headers: {
        authorization: config.token,
        'content-type': 'application/JSON'
      }
    })
    .then (respnose => respnose.json())
    .then (json => {
      console.log(json);
      json.forEach((cardElement) => {
        const photoCardElement =  createCard(cardElement.name, cardElement.link, cardElement._id, cardElement.owner._id);
        
        photoCardsContainer.append(photoCardElement);
      })
    })
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
  .then(json => console.log(json))  
}

function deleteCardAPI (event) {
  const element = event.closest('.photo-card');  
  fetch (`https://nomoreparties.co/v1/plus-cohort7/cards/${element.id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.token
    },
   
  })
  .then (response => response.json())
  .then (json => console.log(json))
}

function findCard () {
  const cardsArray = loadCards();
  console.log(cardsArray)
 }

loadCards();
loadProfile();
findCard();

export {createCardAPI, deleteCardAPI, loadCards, updateProfile, loadProfile}






