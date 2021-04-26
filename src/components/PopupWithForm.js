import { Popup } from "./Popup.js";

import {
  formElement,
  formElementAdd
} from "../utils/constants.js";

export class PopupWithForm extends Popup {
  constructor(elementDOM, { sumbitCallback }) {
    super(elementDOM);
    this._sumbitCallback = sumbitCallback;
    this._selectFormEdit = formElement;
    this._selectFormAdd = formElementAdd;
  }

  _getInputValues() {
    //функция получения данных с полей форм
    this._inputList = this._selectFormEdit.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._elementDOM
      .querySelector(".popup__form")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        const data = this._getInputValues();
        this._sumbitCallback(data);
      });
  }

  close() {
    //закрывает попап и сбрасывает все формы
    super.close();
    formElement.reset();
    formElementAdd.reset();
  }
}
