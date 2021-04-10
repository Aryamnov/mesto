import { Card } from './Card.js';
import { FormValidator, elementValidation } from './FormValidator.js';

const formElement = document.querySelector(".popup__form_place_edit"); // Находим форму редактирования в DOM
const formElementAdd = document.querySelector(".popup__form_place_add"); // Находим форму добавления в DOM
const nameInput = formElement.querySelector(".popup__input_type_name"); // Находим поля формы редактирования в DOM
const jobInput = formElement.querySelector(".popup__input_type_signature");
const nameCard = formElementAdd.querySelector(".popup__input_type_nameCard"); // Находим поля формы для добавления в DOM
const srcCard = formElementAdd.querySelector(".popup__input_type_src");
const nameProfile = document.querySelector(".profile__title"); // Находим значения строк профиля в DOM
const signatureProfile = document.querySelector(".profile__subtitle");
const popupEdit = document.querySelector(".popup_form_edit");
const popupAdd = document.querySelector(".popup_form_add");
const popupImage = document.querySelector(".popup_show_image");
const edditProfile = document.querySelector(".profile__button-edit"); //Находим кнопку "редактировать"
const addPopupForm = document.querySelector(".profile__button-add"); //Находим кнопку "добавить"
const closeProfile = document.querySelector(".popup__close_form_edit"); //Находим кнопки "закрыть"
const closeFormAdd = document.querySelector(".popup__close_form_add");
const closeImage = document.querySelector(".popup__close_show_image");
const popupCollection = document.querySelectorAll(".popup");
const popupButton = formElementAdd.querySelector('.popup__submit');
const formValidatorEdit = new FormValidator(elementValidation, formElement);
const formValidatorAdd = new FormValidator(elementValidation, formElementAdd);

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.forEach(function (element) {
  //Добавляем карточки на странице
  const card = new Card(element, '.element__template');
  card.createCard();
});

function fillForm() {
  // Функция передает текст с сайта в форму
  nameInput.value = nameProfile.textContent;
  jobInput.value = signatureProfile.textContent;
}

function closeEsc(evt) {
  if (evt.key === "Escape") {
    popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

function openPopup(popup) {
  //oткрывает попап
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeEsc); //добавляет слушатель для закрытия по нажатию Esc
}

function openPopupEdit() {
  openPopup(popupEdit);
  fillForm();
}

function openPopupAdd() {
  openPopup(popupAdd);
}

export function openPopupImage() {
  openPopup(popupImage);
}

function closePopup(popup) {
  //закрывает попап
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeEsc);
}

function closePopupEdit() {
  closePopup(popupEdit);
}

function closePopupAdd() {
  closePopup(popupAdd);
}

function closePopupImage() {
  closePopup(popupImage);
}

function formSubmitHandler(evt) {
  //редактируем профиль
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameProfile.textContent = nameInput.value;
  signatureProfile.textContent = jobInput.value;
  closePopupEdit();
}

function resetForm(form) {
  form.reset();
}

function formSubmitAdd(evt) {
  // Добавляем карточки
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const newCard = {
      name: nameCard.value,
      link: srcCard.value
  }
  const card = new Card(newCard, '.element__template');
  card.createCardPrepend();
  popupButton.setAttribute("disabled", true);
  popupButton.classList.add('popup__submit_disabled');
  resetForm(formElementAdd);
  closePopupAdd();
}

popupCollection.forEach((popupElement) => {
  popupElement.addEventListener("click", function closeOnClick(evt) {
    //добавляет слушатель для закрытия по щелчку вне поля
    if (!evt.target.closest(".popup__container")) {
      closePopup(popupElement);
    }
  });
});

formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();

edditProfile.addEventListener("click", openPopupEdit);
closeProfile.addEventListener("click", closePopupEdit);
formElement.addEventListener("submit", formSubmitHandler);
addPopupForm.addEventListener("click", openPopupAdd);
closeFormAdd.addEventListener("click", closePopupAdd);
formElementAdd.addEventListener("submit", formSubmitAdd);
closeImage.addEventListener("click", closePopupImage);