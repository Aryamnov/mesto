import { Popup } from "../components/Popup.js";
import { image, imageInfo } from "../utils/constants.js";

export class PopupWithImage extends Popup {
  open(name, link) {
    //открытие попапа с картинкой карточки
    image.src = link;
    image.alt = name;
    imageInfo.textContent = name;
    super.open();
  }
}
