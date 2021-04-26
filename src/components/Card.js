export class Card {
  constructor(item, selectTemplate, { handleCardClick }) {
    this._name = item.name;
    this._link = item.link;
    this._selectTemplate = selectTemplate;
    this._handleCardClick = handleCardClick;
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
    this._cardElements
      .querySelector(".element__image")
      .addEventListener("click", (evt) => {
        this._handleCardClick(evt);
      });

    //this._setImagePopup();
  }

  createCard() {
    //создает карточку и добавляет в конец
    this._renderCard();
    return this._cardElements;
  }
}
