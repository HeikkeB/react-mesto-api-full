//const AUTH = process.env.REACT_APP_AUTH_TOKEN
//const AUTH = 'ee63acbb-034f-45d3-b9ee-d63e3206b34a'

class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Error: ${res.status}`)
    }
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._handleResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse)
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleResponse)
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._handleResponse)
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._handleResponse)
  }

  likeCard(card) {
    return fetch(`${this._baseUrl}/cards/likes/${card}`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse)
  }

  dislikeCard(card) {
    return fetch(`${this._baseUrl}/cards/likes/${card}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse)
  }

  changeLikeCardStatus(cardId, isNotLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isNotLiked ? 'PUT' : 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse)
  }
}

export const api = new Api({
  baseUrl: /*'https://api.mymesto.nomoredomains.club'*/'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})
