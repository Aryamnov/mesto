let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input-name');
let jobInput = formElement.querySelector('.popup__input-signature');
let nameProfile = document.querySelector('.profile__title');
let signatureProfile = document.querySelector('.profile__subtitle');

function tranferToForm () {
    nameInput.value = nameProfile.textContent;
    jobInput.value = signatureProfile.textContent;
}

function openPopup () {
    let popup = document.querySelector('.popup');
    popup.classList.add('popup_opened');
    tranferToForm ();
}

function closePopup () {
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
}

let edditProfile = document.querySelector('.profile__button-edit');
let closeProfile = document.querySelector('.popup__close');

edditProfile.addEventListener('click', openPopup);
closeProfile.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    signatureProfile.textContent = jobInput.value;
    closePopup ();
}

formElement.addEventListener('submit', formSubmitHandler);