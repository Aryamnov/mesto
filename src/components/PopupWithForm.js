import { Popup } from "./Popup.js";

const formElement = document.querySelector(".popup__form_place_edit"); // Находим форму редактирования в DOM
const formElementAdd = document.querySelector(".popup__form_place_add"); // Находим форму добавления в DOM
const formElementLink = document.querySelector(".popup__form_place_link"); // Находим форму добавления в DOM

export class PopupWithForm extends Popup {
  constructor(elementDOM, { sumbitCallback }) {
    super(elementDOM);
    this._sumbitCallback = sumbitCallback;
    this._selectFormEdit = formElement;
    this._selectFormAdd = formElementAdd;
    this._selectFormLink = formElementLink;
  }

  _getInputValues() {
    //функция получения данных с полей форм
    this._inputList = this._selectFormEdit.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
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

  _getInputValuesLink() {
    //функция получения ссылки с поля ввода адреса аватара
    this._inputList = this._selectFormLink.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListenersLink() {
    super.setEventListeners();
    this._elementDOM
      .querySelector(".popup__form")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        const data = this._getInputValuesLink();
        this._sumbitCallback(data);
      });
  }

  close() {
    //закрывает попап и сбрасывает все формы
    super.close();
    formElement.reset();
    formElementAdd.reset();
    formElementLink.reset();
  }
}
