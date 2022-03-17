const config = {
  urlCards: 'https://nomoreparties.co/v1/plus-cohort7/cards',
  urlProfile: 'https://nomoreparties.co/v1/plus-cohort7/users/me',
  urlLikes :'https://nomoreparties.co/v1/plus-cohort7/cards/likes',
  token: 'd5427cfe-b46d-4e99-8eaf-124e3b1bb259'
}
function getUserDataAPI () {
  return fetch (config.urlProfile, {
    headers: {
      authorization: config.token
    }
  })
  .then (res => {
    if (res.ok) return res.json();
    return Promise.reject(`Reject: ${res.status}`);
  })  
}

function updateProfileAPI (nameInput, aboutInput) {
  return fetch (config.urlProfile, {
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
}

function loadCardsAPI () {
  return fetch (config.urlCards, {
   headers: {
     authorization: config.token,
     'content-type': 'application/JSON'
   }
 })
 .then (res => {
   if (res.ok) return res.json();
   return Promise.reject(`Reject: ${res.status}`);
 }) 
}

function createCardAPI (cardName, cardUrl) {
 return fetch (config.urlCards, {
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
}

function deleteCardAPI (card_id) { 
 return fetch(`${config.urlCards}/${card_id}` , {
    method: "DELETE",
    headers: {
      authorization: config.token
    },    
  })
  .then (res => {
    if (res.ok) return res.json();
    return Promise.reject(`Reject: ${res.status}`);
  })  
}

function putLikeAPI (card_id) {
  return fetch (`${config.urlLikes}/${card_id}`, {
    method: 'PUT',
    headers: {
      authorization: config.token
    },    
  })
  .then(res => {
    if (res.ok) return res.json();
    return Promise.reject(`Reject: ${res.status}`);
  })    
}

function deleteLikeAPI (card_id) {
  return fetch (`${config.urlLikes}/${card_id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.token
    },    
  })
  .then(res => {
    if (res.ok) return res.json();
    return Promise.reject(`Reject: ${res.status}`);
  })   
}

function changeAvatarAPI (image_url) {
  return fetch(`${config.urlProfile}/avatar` , {
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
}

export {createCardAPI, deleteCardAPI, loadCardsAPI, updateProfileAPI, putLikeAPI, changeAvatarAPI, deleteLikeAPI, getUserDataAPI}