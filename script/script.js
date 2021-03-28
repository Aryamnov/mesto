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
const image = document.querySelector(".popup__image"); //Находим картинку в попап
const imageInfo = document.querySelector(".popup__info-image"); //и описания
const elementList = document.querySelector(".elements");
const elementTemplate = document.querySelector(".element__template").content;
const popupCollection = document.querySelectorAll(".popup");

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

function hitLike(cardElements) {
  //функция позволяет ставить лайки
  cardElements
    .querySelector(".element__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_status_active");
    });
}

function delButton(cardElements) {
  //добавляет возможность удалить карточку по клику на кнопку
  const deleteButton = cardElements.querySelector(".element__trash-can");
  deleteButton.addEventListener("click", function () {
    const listItem = deleteButton.closest(".element");
    listItem.remove();
  });
}

function setImagePopup(cardElements) {
  //добавляет возможность открыть карточку по клику на картинку
  cardElements
    .querySelector(".element__image")
    .addEventListener("click", function (evt) {
      openPopupImage();
      image.src = evt.target.src;
      const parrent = evt.target.parentElement;
      const text = parrent.querySelector(".element__title");
      imageInfo.textContent = text.textContent;
    });
}

function createCard(cardName, cardUrl) {
  //создает карточку
  const cardElements = elementTemplate.cloneNode(true);

  cardElements.querySelector(".element__title").textContent = cardName;
  cardElements.querySelector(".element__image").src = cardUrl;

  hitLike(cardElements);
  delButton(cardElements);
  setImagePopup(cardElements);

  return cardElements;
}

initialCards.forEach(function (element) {
  //Добавляем карточки на странице
  const newCard = createCard(element.name, element.link);

  elementList.append(newCard);
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

function openPopupImage() {
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
  const newCard = createCard(nameCard.value, srcCard.value);
  elementList.prepend(newCard);
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

edditProfile.addEventListener("click", openPopupEdit);
closeProfile.addEventListener("click", closePopupEdit);
formElement.addEventListener("submit", formSubmitHandler);
addPopupForm.addEventListener("click", openPopupAdd);
closeFormAdd.addEventListener("click", closePopupAdd);
formElementAdd.addEventListener("submit", formSubmitAdd);
closeImage.addEventListener("click", closePopupImage);