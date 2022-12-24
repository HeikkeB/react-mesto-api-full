//const AUTH = process.env.REACT_APP_AUTH_TOKEN
//const AUTH = 'ee63acbb-034f-45d3-b9ee-d63e3206b34a'

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  _getHeaders() {
    return {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    }
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._getHeaders(),
    }).then(this._handleResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._getHeaders(),
    })
      .then(this._handleResponse)
      .then((res) => {
        this._id = res._id
        return res
      })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._getHeaders(),
    }).then(this._handleResponse)
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleResponse)
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._getHeaders(),
      body: JSON.stringify(data),
    }).then(this._handleResponse)
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._handleResponse)
  }

  likeCard(card) {
    return fetch(`${this._baseUrl}/cards/likes/${card}`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._getHeaders(),
    }).then(this._handleResponse)
  }

  dislikeCard(card) {
    return fetch(`${this._baseUrl}/cards/likes/${card}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._getHeaders(),
    }).then(this._handleResponse)
  }

  changeLikeCardStatus(cardId, isNotLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isNotLiked ? 'PUT' : 'DELETE',
      credentials: 'include',
      headers: this._getHeaders(),
    }).then(this._handleResponse)
  }
}

export const api = new Api({
  baseUrl: 'http://api.myMesto.nomoredomains.club',
})
