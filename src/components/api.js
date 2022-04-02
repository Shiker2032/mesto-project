const config = {
  urlCards: 'https://nomoreparties.co/v1/plus-cohort7/cards',
  urlProfile: 'https://nomoreparties.co/v1/plus-cohort7/users/me',
  urlLikes :'https://nomoreparties.co/v1/plus-cohort7/cards/likes',
  token: 'd5427cfe-b46d-4e99-8eaf-124e3b1bb259',
  headers: {
    authorization: 'd5427cfe-b46d-4e99-8eaf-124e3b1bb259',
    'Content-type': 'application/JSON'   
  }
}

class API  {
  constructor () {};
  _mockFetch () { 
    return fetch (config.urlProfile, {headers: config.headers})
  } 
}

function parseResponse (res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(new Error(`Произошла ошибка со статус - кодом ${res.status}`));
  }
}

function getUserDataAPI () {
  return fetch (config.urlProfile, {
    headers: {
      authorization: config.token
    }
  })
  .then (res => parseResponse (res));
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
  .then (res => parseResponse (res)); 
}

function loadCardsAPI () {
  return fetch (config.urlCards, {
   headers: {
     authorization: config.token,
     'content-type': 'application/JSON'
   }
 })
 .then (res => parseResponse (res));
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
 .then (res => parseResponse (res));
}

function deleteCardAPI (card_id) { 
 return fetch(`${config.urlCards}/${card_id}` , {
    method: "DELETE",
    headers: {
      authorization: config.token
    },    
  })
  .then (res => parseResponse (res)); 
}

function putLikeAPI (card_id) {
  return fetch (`${config.urlLikes}/${card_id}`, {
    method: 'PUT',
    headers: {
      authorization: config.token
    },    
  })
  .then (res => parseResponse (res));   
}

function deleteLikeAPI (card_id) {
  return fetch (`${config.urlLikes}/${card_id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.token
    },    
  })
  .then (res => parseResponse (res));  
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
  .then (res => parseResponse (res));
}

export {API, createCardAPI, deleteCardAPI, loadCardsAPI, updateProfileAPI, putLikeAPI, changeAvatarAPI, deleteLikeAPI, getUserDataAPI}