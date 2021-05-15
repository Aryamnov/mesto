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

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

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

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  setEventListenersSubmit() {
    this._elementDOM.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
  }
}
