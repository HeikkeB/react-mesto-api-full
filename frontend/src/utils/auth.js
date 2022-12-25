//const BASE_URL = process.env.REACT_APP_BASE_URL
const base_url = 'https://api.myMesto.nomoredomains.club'

function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
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

// export const validateJWT = (token) => {
//   return fetch(`${base_url}/users/me`, {
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     },
//   }).then(handleResponse)
// }
