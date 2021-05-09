import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
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
  closeProfile,
  closeFormAdd,
  popupButton,
  elementList,
  popup__submit_disabled,
  elementValidation,
  avatar,
  popupLink,
  closeFormLink,
  popup__submit_edit,
  popup__submit_link,
} from "../utils/constants.js";

const idCard = "";

const formValidatorEdit = new FormValidator(elementValidation, formElement);
const formValidatorAdd = new FormValidator(elementValidation, formElementAdd);
const formValidatorLink = new FormValidator(elementValidation, formElementLink);

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-23/",
  headers: {
    authorization: "0d53c9da-d73c-4f78-96df-8f4e01440995",
    "content-type": "application/json",
  },
});

const userInfo = new UserInfo(
  nameProfile.textContent,
  signatureProfile.textContent
);

const userData = api.getDataUser();
userData.then((data) => {
  console.log(data);
  nameProfile.textContent = data.name;
  signatureProfile.textContent = data.about;
  avatar.src = data.avatar;
  userInfo.setUserInfo(data);
});

const allCards = api.getAllCard();
console.log(allCards);
allCards.then((data) => {
  data.map((item) => console.log(item));
});

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

function newCreateCard(element, selectTemplate) {
  const card = new Card(
    element,
    selectTemplate,
    {
      handleCardClick: (evt) => {
        const link = element.link;
        const name = element.name;
        popupWithImage.open(name, link);
      },
    },
    api
  );
  return card.createCard();
}

allCards.then((data) => {
  data.map((item) => {
    const cardList = new Section(
      {
        //Добавляем карточки на странице
        items: item,
        renderer: (element) => {
          const cardElement = newCreateCard(element, ".element__template");
          cardList.addItem(cardElement);
        },
      },
      elementList
    );
    cardList.renderItems();
  });
});

const popupWithFormEdit = new PopupWithForm(popupEdit, {
  sumbitCallback: (data) => {
    console.log(popup__submit_edit.textContent);
    popup__submit_edit.textContent = "Сохранение...";
    const newDataUser = api
      .setUserInfo(data.name, data.about)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupWithFormEdit.close();
        popup__submit_edit.textContent = "Сохранить";
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  },
});
popupWithFormEdit.setEventListeners();

const popupWithFormLink = new PopupWithForm(popupLink, {
  sumbitCallback: (item) => {
    popup__submit_link.textContent = "Сохранение...";
    console.log(item.link);
    const newDataUser = api
      .newAvatar(item.link)
      .then((data) => {
        avatar.src = data.avatar;
        popupWithFormLink.close();
        popup__submit_link.textContent = "Сохранить";
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
    popupWithFormLink.close();
  },
});
popupWithFormLink.setEventListenersLink();

function resetForm(form) {
  form.reset();
}

const popupWithFormAdd = new PopupWithForm(popupAdd, {
  sumbitCallback: (data) => {
    popupButton.textContent = "Сохранение...";
    const newCard = {
      name: nameCard.value,
      link: srcCard.value,
    };
    const newCardAdd = api.addNewCard(newCard);
    newCardAdd.then((item) => {
      console.log(item);
      const cardList = new Section(
        {
          //Добавляем карточки на странице
          items: item,
          renderer: (element) => {
            const cardElement = newCreateCard(element, ".element__template");
            cardList.addItemPrepend(cardElement);
          },
        },
        elementList
      );
      console.log("и сюда");
      cardList.renderItems();
      popupButton.textContent = "Создать";
    });

    popupButton.setAttribute("disabled", true);
    popupButton.classList.add(popup__submit_disabled);
    resetForm(formElementAdd);

    popupWithFormAdd.close();
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

closeProfile.addEventListener("click", () => {
  popupWithFormEdit.close();
});

addPopupForm.addEventListener("click", () => {
  popupWithFormAdd.open(popupAdd);
});

closeFormAdd.addEventListener("click", () => {
  popupWithFormAdd.close();
});

avatar.addEventListener("click", () => {
  popupWithFormLink.open(popupLink);
});

closeFormLink.addEventListener("click", () => {
  popupWithFormLink.close();
});
