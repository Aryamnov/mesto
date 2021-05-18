import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  open(name, link) {
    //открытие попапа с картинкой карточки
    this._elementDOM.querySelector(".popup__image").src = link;
    this._elementDOM.querySelector(".popup__image").alt = name;
    this._elementDOM.querySelector(".popup__info-image").textContent = name;
    super.open();
  }
}
