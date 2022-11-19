class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfoFromServer() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        ...this._headers,
      },
      credentials: "include",
    }).then((res) => {
      return this._checkAnswer(res);
    });
  }

  setUserInfoFromServer({ name, job }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        ...this._headers,
      },
      credentials: "include",
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    }).then((res) => {
      return this._checkAnswer(res);
    });
  }

  getInitialCardsFromServer() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        ...this._headers,
      },
      credentials: "include",
    }).then((res) => {
      return this._checkAnswer(res);
    });
  }

  setCardToServer({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        ...this._headers,
      },
      credentials: "include",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._checkAnswer(res);
    });
  }

  deleteCardFromServer(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        ...this._headers,
      },
      credentials: "include",
    }).then((res) => {
      return this._checkAnswer(res);
    });
  }

  getUserInfoAndCardFromServer() {
    return Promise.all([
      this.getUserInfoFromServer(),
      this.getInitialCardsFromServer(),
    ]);
  }

  changeLikeStatus(isLiked, cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        ...this._headers,
      },
      credentials: "include",
    }).then((res) => {
      return this._checkAnswer(res);
    });
  }

  changeUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        ...this._headers,
      },
      credentials: "include",
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      return this._checkAnswer(res);
    });
  }
};

const api = new Api({
  baseUrl: "https://api.mesto.yandex.nomoredomains.icu",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export {api};