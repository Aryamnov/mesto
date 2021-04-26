export class Popup {
  constructor(elementDOM) {
    this._elementDOM = elementDOM;
    this._closeButton = this._elementDOM.querySelector(".popup__close");
  }

  open() {
    this._elementDOM.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._elementDOM.classList.remove("popup_opened");
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
    this._elementDOM.addEventListener("click", (evt) => {
      if (
        !evt.target.closest(".popup__container") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}
