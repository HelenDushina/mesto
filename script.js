let popup            = document.querySelector('.popup');
let openPopupButton  = document.querySelector('.profile__edit');
let closePopupButton = document.querySelector('.popup__close');
let popupFieldName      = document.querySelector('.popup__fieldName');
let popupFieldActivity      = document.querySelector('.popup__fieldActivity');
let profileName      = document.querySelector('.profile__name');
let profileActivity  = document.querySelector('.profile__activity');
let formElement      = document.querySelector('.popup__form');

function togglePopup() {
if (!popup.classList.contains('popup_opend')) {
  popupFieldName.value = profileName.textContent;
  popupFieldActivity.value = profileActivity.textContent;
}

  popup.classList.toggle('popup_opend');
}

openPopupButton.addEventListener('click', togglePopup);

closePopupButton.addEventListener('click', togglePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
}


formElement.addEventListener('submit', formSubmitHandler);
