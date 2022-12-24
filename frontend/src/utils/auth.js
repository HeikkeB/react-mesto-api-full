//const BASE_URL = process.env.REACT_APP_BASE_URL
const base_url = 'http://api.myMesto.nomoredomains.club'

function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (email, password) => {
  return fetch(`${base_url}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse)
}

export const authorize = (email, password) => {
  return fetch(`${base_url}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse)
}

export const validateJWT = (token) => {
  return fetch(`${base_url}/users/me`, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  }).then(handleResponse)
}
