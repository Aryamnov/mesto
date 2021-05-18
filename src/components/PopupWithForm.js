import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(elementDOM, { sumbitCallback }) {
    super(elementDOM);
    this._sumbitCallback = sumbitCallback;
    this._form = this._elementDOM.querySelector(".popup__form");
  }

  getInputValues() {
    //функция получения данных с полей форм
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const data = this.getInputValues();
      this._sumbitCallback(data);
    });
  }

  close() {
    //закрывает попап и сбрасывает все формы
    super.close();
    this._form.reset();
  }
}
