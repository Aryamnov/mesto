import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { ConfirmationPopup } from "../components/ConfirmationPopup.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import "./index.css";

import {
  formElement,
  formElementAdd,
  formElementLink,
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
  popupButton,
  elementList,
  elementValidation,
  avatar,
  popupLink,
  popupSubmitEdit,
  popupSubmitLink,
  popupDelete,
} from "../utils/constants.js";

window.idCard = "";

const formValidatorEdit = new FormValidator(elementValidation, formElement);
const formValidatorAdd = new FormValidator(elementValidation, formElementAdd);
const formValidatorLink = new FormValidator(elementValidation, formElementLink);

const popupWithFormDelete = new ConfirmationPopup(popupDelete);
popupWithFormDelete.setEventListeners();
//popupWithFormDelete.setEventListenersSubmit();

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-23/",
  headers: {
    authorization: "0d53c9da-d73c-4f78-96df-8f4e01440995",
    "content-type": "application/json",
  },
});

const userInfo = new UserInfo(
  nameProfile.textContent,
  signatureProfile.textContent,
  avatar.src
);

let userId = null;

function newCreateCard(element, selectTemplate, userId) {
  const card = new Card(userId, element, selectTemplate, {
    handleCardClick: (evt) => {
      const link = element.link;
      const name = element.name;
      popupWithImage.open(name, link);
    },
    handleDeleteIconClick: (id) => {
      popupWithFormDelete.open();
      popupWithFormDelete.setSubmitAction(function () {
        api
          .deleteCard(id)
          .then(() => {
            card.removeCard();
            popupWithFormDelete.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    handleLikeClick: (evt) => {
      api
        .likeCard(idCard)
        .then((data) => {
          card.updateLikes(data, evt);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDislikeClick: (evt) => {
      api
        .likeDisableCard(idCard)
        .then((data) => {
          card.updateLikes(data, evt);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return card.createCard();
}

const cardList = new Section(
  {
    //Добавляем карточки на странице
    items: [],
    renderer: (element) => {
      const cardElement = newCreateCard(element, ".element__template", userId);
      cardList.addItem(cardElement);
    },
  },
  elementList
);

api
  .getAppInfo()
  .then(([cardsArray, userData]) => {
    // здесь мы сохранили наш id пользователя
    userId = userData._id;
    // устанавливаем данные о пользователе
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    // начинаем отрисовывать наши карточки
    cardList.renderItems(cardsArray);
  })
  .catch((err) => {
    console.log(err);
  });

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

const popupWithFormEdit = new PopupWithForm(popupEdit, {
  sumbitCallback: (data) => {
    popupSubmitEdit.textContent = "Сохранение...";
    const newDataUser = api
      .setUserInfo(data.name, data.about)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupWithFormEdit.close();
        popupSubmitEdit.textContent = "Сохранить";
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
popupWithFormEdit.setEventListeners();

const popupWithFormLink = new PopupWithForm(popupLink, {
  sumbitCallback: (item) => {
    popupSubmitLink.textContent = "Сохранение...";
    const newDataUser = api
      .newAvatar(item.link)
      .then((data) => {
        userInfo.setUserAvatar(data);
        popupWithFormLink.close();
        popupSubmitLink.textContent = "Сохранить";
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
popupWithFormLink.setEventListeners();

const popupWithFormAdd = new PopupWithForm(popupAdd, {
  sumbitCallback: (data) => {
    popupButton.textContent = "Сохранение...";
    const newCard = popupWithFormAdd.getInputValues();
    const newCardAdd = api.addNewCard(newCard);
    newCardAdd
      .then((item) => {
        const cardElement = newCreateCard(item, ".element__template", userId);
        cardList.addItemPrepend(cardElement);
        popupButton.textContent = "Создать";
        popupWithFormAdd.close();
      })
      .catch((err) => {
        console.log(err);
        popupButton.textContent = "Создать";
        formValidatorAdd.toggleButtonState();
      });
    formValidatorAdd.disableButton();
  },
});
popupWithFormAdd.setEventListeners();

formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();
formValidatorLink.enableValidation();

edditProfile.addEventListener("click", () => {
  popupWithFormEdit.open(popupEdit);
  const user = userInfo.getUserInfo();
  nameInput.value = user.nameProfile;
  jobInput.value = user.signatureProfile;
});

addPopupForm.addEventListener("click", () => {
  popupWithFormAdd.open();
});

avatar.addEventListener("click", () => {
  popupWithFormLink.open();
});
