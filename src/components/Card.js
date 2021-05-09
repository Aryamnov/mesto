import { popupDelete } from "../utils/constants.js";

import { idCard } from "../pages/index.js";

import { Popup } from "../components/Popup.js";
import { Api } from "../components/Api.js";

export class Card {
  constructor(item, selectTemplate, { handleCardClick }) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._id = item._id;
    this._userId = item.owner._id;
    this._selectTemplate = selectTemplate;
    this._handleCardClick = handleCardClick;
  }

  _hitLike() {
    //функция позволяет ставить лайки
    this._cardElements
      .querySelector(".element__like")
      .addEventListener("click", function (evt) {
        const api = new Api({
          url: "https://mesto.nomoreparties.co/v1/cohort-23/",
          headers: {
            authorization: "0d53c9da-d73c-4f78-96df-8f4e01440995",
            "content-type": "application/json",
          },
        });
        idCard = evt.target.id;
        console.log(idCard);
        if (!evt.target.classList.contains("element__like_status_active")) {
          const hitApi = api
            .likeCard(idCard)
            .then((data) => {
              console.log(data);
              evt.target.classList.add("element__like_status_active");
              parent = evt.target.parentElement;
              parent.querySelector(".element__like-span").textContent =
                data.likes.length;
            })
            .catch((err) => {
              console.log("Произошла ошибка");
            });
        } else {
          const hitApi = api
            .likeDisableCard(idCard)
            .then((data) => {
              console.log(data);
              evt.target.classList.remove("element__like_status_active");
              parent = evt.target.parentElement;
              parent.querySelector(".element__like-span").textContent =
                data.likes.length;
            })
            .catch((err) => {
              console.log("Произошла ошибка");
            });
        }
      });
  }

  _delButton() {
    //добавляет возможность удалить карточку по клику на кнопку
    const deleteButton = this._cardElements.querySelector(
      ".element__trash-can"
    );

    deleteButton.addEventListener("click", function (evt) {
      const popupWithFormDelete = new Popup(popupDelete);
      popupWithFormDelete.setEventListeners();
      popupWithFormDelete.open(popupDelete);
      idCard = evt.target.id;
      console.log(idCard);
      popupDelete.addEventListener("submit", (evt) => {
        evt.preventDefault();
        const api = new Api({
          url: "https://mesto.nomoreparties.co/v1/cohort-23/",
          headers: {
            authorization: "0d53c9da-d73c-4f78-96df-8f4e01440995",
            "content-type": "application/json",
          },
        });
        const deleteCardApi = api
          .deleteCard(idCard)
          .then((data) => {
            const listItem = deleteButton.closest(".element");
            listItem.remove();
            popupWithFormDelete.close();
          })
          .catch((err) => {
            console.log("Невозможно удалить карточку");
          });
      });
    });
  }

  _renderCard() {
    //создает карточку
    this._cardElements = document
      .querySelector(this._selectTemplate)
      .content.cloneNode(true);

    this._cardElements.querySelector(
      ".element__title"
    ).textContent = this._name;
    this._cardElements.querySelector(".element__image").alt = this._name;
    this._cardElements.querySelector(".element__image").src = this._link;
    this._cardElements.querySelector(
      ".element__like-span"
    ).textContent = this._likes.length;
    this._cardElements.querySelector(".element__trash-can").id = this._id;
    this._cardElements.querySelector(".element__like").id = this._id;
    if (this._likes.find((like) => like._id === "934745e4b5697f429d92610b")) {
      this._cardElements
        .querySelector(".element__like")
        .classList.add("element__like_status_active");
    }

    this._hitLike();

    if (this._userId != "934745e4b5697f429d92610b") {
      this._cardElements.querySelector(".element__trash-can").style.display =
        "none";
    }

    this._delButton();
    this._cardElements
      .querySelector(".element__image")
      .addEventListener("click", (evt) => {
        this._handleCardClick(evt);
      });
  }

  createCard() {
    //создает карточку и добавляет в конец
    this._renderCard();
    return this._cardElements;
  }
}
