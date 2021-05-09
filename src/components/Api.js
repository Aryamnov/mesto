export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getAllCard() {
    return fetch(this._url + "cards", {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log("Ошибка");
      return Promise.reject("Произошла ошибка");
    });
  }

  getDataUser() {
    return fetch(this._url + "users/me", {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log("Ошибка");
      return Promise.reject("Произошла ошибка");
    });
  }

  setUserInfo(newName, newAbout) {
    return fetch(this._url + "users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log("Ошибка");
      return Promise.reject("Произошла ошибка");
    });
  }

  addNewCard(newCard) {
    return fetch(this._url + "cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log("Ошибка");
      return Promise.reject("Произошла ошибка");
    });
  }

  deleteCard(id) {
    return fetch(this._url + "cards/" + id, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log("Ошибка");
      return Promise.reject("Произошла ошибка");
    });
  }

  likeCard(id) {
    return fetch(this._url + "cards/likes/" + id, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log("Ошибка");
      return Promise.reject("Произошла ошибка");
    });
  }

  likeDisableCard(id) {
    return fetch(this._url + "cards/likes/" + id, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log("Ошибка");
      return Promise.reject("Произошла ошибка");
    });
  }

  newAvatar(link) {
    return fetch(this._url + "users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log("Ошибка");
      return Promise.reject("Произошла ошибка");
    });
  }
}
