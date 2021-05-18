export class UserInfo {
  constructor(name, signature, avatar) {
    this._nameProfile = name;
    this._signatureProfile = signature;
    this._avatar = avatar;
  }

  getUserInfo() {
    //получает текущие данные пользователя
    return {
      nameProfile: this._nameProfile,
      signatureProfile: this._signatureProfile,
      avatar: this._avatar,
    };
  }

  setUserInfo(newInfo) {
    //записывает в объект и DOM значения с формы
    this._nameProfile = newInfo.name;
    this._signatureProfile = newInfo.about;
    document.querySelector(".profile__title").textContent = this._nameProfile;
    document.querySelector(".profile__subtitle").textContent =
      this._signatureProfile;
  }

  setUserAvatar(newInfo) {
    this._avatar = newInfo.avatar;
    document.querySelector(".profile__avatar").src = this._avatar;
  }
}
