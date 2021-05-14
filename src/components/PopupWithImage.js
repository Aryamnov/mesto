import { Popup } from "../components/Popup.js";

const image = document.querySelector(".popup__image"); //Находим картинку в попап
const imageInfo = document.querySelector(".popup__info-image"); //и описания

export class PopupWithImage extends Popup {
  open(name, link) {
    //открытие попапа с картинкой карточки
    image.src = link;
    image.alt = name;
    imageInfo.textContent = name;
    super.open();
  }

  setEventListeners() {
    this._elementDOM.addEventListener("click", (evt) => {
      if (
        !evt.target.closest(".popup__picture") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}
