import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import "./index.css";

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
  popupButton,
  elementList,
  initialCards,
  popup__submit_disabled,
  elementValidation,
} from "../utils/constants.js";

const formValidatorEdit = new FormValidator(elementValidation, formElement);
const formValidatorAdd = new FormValidator(elementValidation, formElementAdd);

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

function newCreateCard(element, selectTemplate) {
  const card = new Card(element, selectTemplate, { handleCardClick: (evt) => {
      const link = element.link;
      const name = element.name;
      popupWithImage.open(name, link);
    },
  });
  return card.createCard();
}


const cardList = new Section(
  {
    //Добавляем карточки на странице
    items: initialCards,
    renderer: (element) => {
      const cardElement = newCreateCard(element, ".element__template");
      cardList.addItem(cardElement);
    },
  },
  elementList
);
cardList.renderItems();

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
          const cardElement = newCreateCard(element, ".element__template");
          cardList.addItemPrepend(cardElement);
        },
      },
      elementList
    );

    newList.renderItems();

    popupButton.setAttribute("disabled", true);
    popupButton.classList.add(popup__submit_disabled);
    resetForm(formElementAdd);

    popupWithFormAdd.close();
  },
});
popupWithFormAdd.setEventListeners();

formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();

edditProfile.addEventListener("click", () => {
  popupWithFormEdit.open(popupEdit);
  const user = userInfo.getUserInfo();
  nameInput.value = user.nameProfile;
  jobInput.value = user.signatureProfile;
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
