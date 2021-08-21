let popup = document.querySelector('.popup');
let openPopupButton = document.querySelector('.profile__edit');
let closePopupButton = document.querySelector('.popup__close');
let popupFieldName = document.querySelector('.popup__form-field_theme_name');
let popupFieldActivity = document.querySelector('.popup__form-field_theme_activity');
let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');
let formElement = document.querySelector('.popup__form');


function openPopup() {
    popupFieldName.value = profileName.textContent;
    popupFieldActivity.value = profileActivity.textContent;
    popup.classList.toggle('popup_opend');
}

function closePopup() {

  popup.classList.toggle('popup_opend');
}

openPopupButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();

  letnameInput = popupFieldName.value;
  letjobInput = popupFieldActivity.value;

  profileName.textContent = letnameInput;
  profileActivity.textContent = letjobInput;

  closePopup();
}

openPopupButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);
