export class Card {
  constructor(
    userId,
    item,
    selectTemplate,
    {
      handleCardClick,
      handleDeleteIconClick,
      handleLikeClick,
      handleDislikeClick,
    }
  ) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._id = item._id;
    this._userIdCard = item.owner._id;
    this._selectTemplate = selectTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleDislikeClick = handleDislikeClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
  }

  _hitLike() {
    //функция позволяет ставить лайки
    this._cardElements
      .querySelector(".element__like")
      .addEventListener("click", (evt) => {
        idCard = evt.target.id;
        if (!evt.target.classList.contains("element__like_status_active")) {
          this._handleLikeClick(evt);
        } else {
          this._handleDislikeClick(evt);
        }
      });
  }

  _delButton() {
    //добавляет возможность удалить карточку по клику на кнопку
    const deleteButton = this._cardElements.querySelector(
      ".element__trash-can"
    );

    deleteButton.addEventListener("click", (evt) => {
      idCard = evt.target.id;
      this._handleDeleteIconClick(idCard);
    });
  }

  removeCard() {
    const deleteButton = document.getElementById(idCard);
    const listItem = deleteButton.closest(".element");
    listItem.remove();
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

    if (this._userIdCard != this._userId) {
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
