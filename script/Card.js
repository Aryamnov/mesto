import { openPopupImage } from "./index.js";

const elementList = document.querySelector(".elements");
const image = document.querySelector(".popup__image"); //Находим картинку в попап
const imageInfo = document.querySelector(".popup__info-image"); //и описания

export class Card {
  constructor(item, selectTemplate) {
    this._name = item.name;
    this._link = item.link;
    this._selectTemplate = selectTemplate;
    this._cardElements;
  }

  _hitLike() {
    //функция позволяет ставить лайки
    this._cardElements
      .querySelector(".element__like")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("element__like_status_active");
      });
  }

  _delButton() {
    //добавляет возможность удалить карточку по клику на кнопку
    const deleteButton = this._cardElements.querySelector(
      ".element__trash-can"
    );
    deleteButton.addEventListener("click", function () {
      const listItem = deleteButton.closest(".element");
      listItem.remove();
    });
  }

  _setImagePopup() {
    //добавляет возможность открыть карточку по клику на картинку
    this._cardElements
      .querySelector(".element__image")
      .addEventListener("click", function (evt) {
        openPopupImage();
        image.src = evt.target.src;
        const parrent = evt.target.parentElement;
        const text = parrent.querySelector(".element__title");
        imageInfo.textContent = text.textContent;
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
    this._cardElements.querySelector(".element__image").src = this._link;

    this._hitLike();
    this._delButton();
    this._setImagePopup();
  }

  createCard() {
    //создает карточку и добавляет в конец
    this._renderCard();
    elementList.append(this._cardElements);
  }

  createCardPrepend() {
    //создает карточку и добавляет в начале списка
    this._renderCard();
    elementList.prepend(this._cardElements);
  }
}
