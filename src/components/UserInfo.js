export class UserInfo {
  constructor(name, signature, avatar) {
    this._nameProfile = name;
    this._signatureProfile = signature;
    this._avatar = avatar;
  }

  getUserInfo() {
    //получает текущие данные пользователя
    return {
      nameProfile: this._nameProfile.textContent,
      signatureProfile: this._signatureProfile.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo(newInfo) {
    //записывает в объект и DOM значения с формы
    this._nameProfile.textContent = newInfo.name;
    this._signatureProfile.textContent = newInfo.about;
  }

  setUserAvatar(newInfo) {
    this._avatar.src = newInfo.avatar;
  }
}
