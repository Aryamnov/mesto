import { popupCollection } from "../utils/constants.js";

export class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
    this._closeButton = this._selectorPopup.querySelector(".popup__close");
  }

  open() {
    this._selectorPopup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    popupCollection.forEach((popupElement) => {
      popupElement.addEventListener("click", (evt) => {
        //добавляет слушатель для закрытия по щелчку вне поля
        if (!evt.target.closest(".popup__container")) {
          this.close();
        }
      });
    });
  }

  close() {
    this._selectorPopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const popupOpened = document.querySelector(".popup_opened");
      popupOpened.classList.remove("popup_opened");
      document.removeEventListener("keydown", this._handleEscClose);
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close);
  }
}
