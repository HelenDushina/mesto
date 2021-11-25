
const onError = (res) =>{
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
}

export default class Api {
  constructor(options) {
    this._url = options.baseUrl
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers
    })
      .then(this._checkResponse);

  }

  editUser(data) { //name и about
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);

  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    })
      .then(this._checkResponse);

  }


  addCard(data) { //свойства name и link
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);

  }

  changeAvatar(data) { // свойство avatar
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);

  }

  deleteCard(dataId) {
    return fetch(`${this._url}/cards/${dataId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  likeCard(dataId) {
    return fetch(`${this._url}/cards/likes/${dataId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  removeLikeCard(dataId) {
    return fetch(`${this._url}/cards/likes/${dataId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

}
