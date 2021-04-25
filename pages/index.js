import { Card } from "../components/Card.js";
import {
  FormValidator,
  elementValidation,
} from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import {
  formElement,
  formElementAdd,
  nameInput,
  jobInput,
  nameCard,
  srcCard,
  nameProfile,
  signatureProfile,
  popupEdit,
  popupAdd,
  popupImage,
  edditProfile,
  addPopupForm,
  closeProfile,
  closeFormAdd,
  popupCollection,
  popupButton,
  elementList,
  initialCards,
} from "../utils/constants.js";

const formValidatorEdit = new FormValidator(elementValidation, formElement);
const formValidatorAdd = new FormValidator(elementValidation, formElementAdd);

const cardList = new Section(
  {
    //Добавляем карточки на странице
    items: initialCards,
    renderer: (element) => {
      const card = new Card(element, ".element__template", {
        handleCardClick: (evt) => {
          const popupWithImage = new PopupWithImage(popupImage);
          popupWithImage.open(evt);
        },
      });
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    },
  },
  elementList
);
cardList.renderItems();

function fillForm() {
  // Функция передает текст с сайта в форму
  nameInput.value = nameProfile.textContent;
  jobInput.value = signatureProfile.textContent;
}

const userInfo = new UserInfo(
  nameProfile.textContent,
  signatureProfile.textContent
);

const popupWithFormEdit = new PopupWithForm(popupEdit, {
  sumbitCallback: (data) => {
    userInfo.setUserInfo(data);
    popupWithFormEdit.close();
  },
});
popupWithFormEdit.setEventListeners();

function resetForm(form) {
  form.reset();
}

const popupWithFormAdd = new PopupWithForm(popupAdd, {
  sumbitCallback: (data) => {
    const newCard = Array.of({
      name: nameCard.value,
      link: srcCard.value,
    });

    const newList = new Section(
      {
        //Добавляем новую карточку на странице
        items: newCard,
        renderer: (element) => {
          const card = new Card(element, ".element__template", {
            handleCardClick: (evt) => {
              const popupWithImage = new PopupWithImage(popupImage);
              popupWithImage.open(evt);
            },
          });
          const cardElement = card.createCard();
          cardList.addItemPrepend(cardElement);
        },
      },
      elementList
    );

    newList.renderItems();

    popupButton.setAttribute("disabled", true);
    popupButton.classList.add("popup__submit_disabled");
    resetForm(formElementAdd);

    popupWithFormAdd.close();
  },
});
popupWithFormAdd.setEventListeners();

formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();

edditProfile.addEventListener("click", () => {
  popupWithFormEdit.open(popupEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = signatureProfile.textContent;
});

closeProfile.addEventListener("click", () => {
  popupWithFormEdit.close();
});

addPopupForm.addEventListener("click", () => {
  popupWithFormAdd.open(popupAdd);
});

closeFormAdd.addEventListener("click", () => {
  popupWithFormAdd.close();
});
