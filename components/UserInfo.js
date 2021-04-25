import { nameProfile, signatureProfile } from "../utils/constants.js";

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
    this._nameProfile = newInfo.nameNewInput;
    this._signatureProfile = newInfo.jobNewInput;
    nameProfile.textContent = this._nameProfile;
    signatureProfile.textContent = this._signatureProfile;
  }
}
