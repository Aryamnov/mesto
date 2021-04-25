import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  open(evt) {
    //открытие попапа с картинкой карточки
    const image = document.querySelector(".popup__image"); //Находим картинку в попап
    const imageInfo = document.querySelector(".popup__info-image"); //и описания
    image.src = evt.target.src;
    const parrent = evt.target.parentElement;
    const text = parrent.querySelector(".element__title");
    imageInfo.textContent = text.textContent;
    super.open();
  }
}
