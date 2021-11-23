
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

  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers
    })
      .then(onError);

  }

  editUser(data) { //name и about
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(onError);

  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    })
      .then(onError);

  }


  addCard(data) { //свойства name и link
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(onError);

  }

  changeAvatar(data) { // свойство avatar
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(onError);

  }

  deleteCard(dataId) {
    return fetch(`${this._url}/cards/${dataId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(onError);
  }

  likeCard(dataId) {
    return fetch(`${this._url}/cards/likes/${dataId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(onError);
  }

  removeLikeCard(dataId) {
    return fetch(`${this._url}/cards/likes/${dataId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(onError);
  }

}
