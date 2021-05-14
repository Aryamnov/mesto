const nameProfile = document.querySelector(".profile__title"); // Находим значения строк профиля в DOM
const signatureProfile = document.querySelector(".profile__subtitle");

export class UserInfo {
  constructor(name, signature) {
    this._nameProfile = name;
    this._signatureProfile = signature;
  }

  getUserInfo() {
    //получает текущие данные пользователя
    return {
      nameProfile: this._nameProfile,
      signatureProfile: this._signatureProfile,
    };
  }

  setUserInfo(newInfo) {
    //записывает в объект и DOM значения с формы
    this._nameProfile = newInfo.name;
    this._signatureProfile = newInfo.about;
    nameProfile.textContent = this._nameProfile;
    signatureProfile.textContent = this._signatureProfile;
  }
}
