let popup            = document.querySelector('.popup');
let openPopupButton  = document.querySelector('.profile__edit');
let closePopupButton = document.querySelector('.popup__close');
let popupField1      = document.querySelector('.popup__field1');
let popupField2      = document.querySelector('.popup__field2');
let profileName      = document.querySelector('.profile__name');
let profileActivity  = document.querySelector('.profile__activity');
let formElement      = document.querySelector('.popup__form');

function togglePopup() {
if (!popup.classList.contains('popup_opend')) {
  popupField1.value = profileName.textContent;
  popupField2.value = profileActivity.textContent;
}

  popup.classList.toggle('popup_opend');
}

openPopupButton.addEventListener('click', togglePopup);

closePopupButton.addEventListener('click', togglePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
}


formElement.addEventListener('submit', formSubmitHandler);
