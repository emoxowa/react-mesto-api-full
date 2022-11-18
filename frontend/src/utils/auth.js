export const baseUrl = "https://api.mesto.yandex.nomoredomains.icu";

export const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      credentials: "include",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};
  
export const authorize = (email, password) => {
  console.log('auth');
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      credentials: "include",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};
  
export const getToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      credentials: "include",
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};