export class FormValidator {
  constructor(elementValidation, formElement) {
    this._formSelector = elementValidation.formSelector;
    this._inputSelector = elementValidation.inputSelector;
    this._submitButtonSelector = elementValidation.submitButtonSelector;
    this._inactiveButtonClass = elementValidation.inactiveButtonClass;
    this._inputErrorClass = elementValidation.inputErrorClass;
    this._errorClass = elementValidation.errorClass;
    this._formELement = formElement;
  }

  _checkInputsEmpty = () => {
    //Проверяет, если ли пустые поля
    return !this._inputList.some(
      (inputElement) => inputElement.value.length > 0
    );
  };

  _chechHasInvalidInput = () => {
    //Проверяет, если ли ошибки в ввёденых данных
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  };

  _toggleButtonState = () => {
    //Блокирует и снимает блокировку с кнопки
    if (this._chechHasInvalidInput() || this._checkInputsEmpty()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  };

  _showInputError = (inputElement) => {
    //Показывает ошибку поля
    const errorElement = this._formELement.querySelector(
      `#${inputElement.name}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage; //Заполняет span с ошибкой
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    //Скрывает ошибку поля
    const errorElement = this._formELement.querySelector(
      `#${inputElement.name}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "Нет ошибки";
  };

  _checkInput = (inputElement) => {
    //Проверяет, есть ли ошибки и показывает/скрывает по результату
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  };

  _setInputListeners = () => {
    //Включает проверку полей и их работу
    this._inputList = Array.from(
      this._formELement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formELement.querySelector(
      this._submitButtonSelector
    );
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInput(inputElement);
        this._toggleButtonState();
      });
      this._toggleButtonState();
    });
  };

  enableValidation = () => {
    this._formELement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setInputListeners();
  };
}

export const elementValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
