let formElement = document.querySelector('.popup__form'); // Находим форму в DOM
let nameInput = formElement.querySelector('.popup__input_type_name'); // Находим поля формы в DOM
let jobInput = formElement.querySelector('.popup__input_type_signature'); 
let nameProfile = document.querySelector('.profile__title'); // Находим значения строк профиля в DOM
let signatureProfile = document.querySelector('.profile__subtitle');
let popup = document.querySelector('.popup'); 
let edditProfile = document.querySelector('.profile__button-edit'); //Находим кнопку "редактировать"
let closeProfile = document.querySelector('.popup__close'); //Находим кнопку "закрыть"

function tranferToForm () { // Функция передает текст с сайта в форму
    nameInput.value = nameProfile.textContent;
    jobInput.value = signatureProfile.textContent;
}

function openPopup () {
    popup.classList.add('popup_opened');
    tranferToForm ();
}

function closePopup () {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) { 
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    nameProfile.textContent = nameInput.value;
    signatureProfile.textContent = jobInput.value;
    closePopup ();
}

edditProfile.addEventListener('click', openPopup);
closeProfile.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);