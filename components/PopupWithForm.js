import { Popup } from "./Popup.js";

import {
  formElement,
  formElementAdd,
  nameInput,
  jobInput,
  nameCard,
  srcCard,
} from "../utils/constants.js";

export class PopupWithForm extends Popup {
  constructor(selectorPopup, { sumbitCallback }) {
    super(selectorPopup);
    this._sumbitCallback = sumbitCallback;
    this._selectFormEdit = formElement;
    this._selectFormAdd = formElementAdd;
  }

  _getInputValues() {
    //функция получения данных с полей форм
    const formData = {
      nameNewInput: nameInput.value,
      jobNewInput: jobInput.value,
      nameNewCard: nameCard.value,
      srcNewImage: srcCard.value,
    };
    return formData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._selectorPopup
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
    this._selectFormEdit.reset();
    this._selectFormAdd.reset();
  }
}
