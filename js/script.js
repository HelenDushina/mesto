import Card from '../js/Card.js';
import {openPopup, closePopup, closePopupByEsc} from '../js/utils.js';
import FormValidator from '../js/FormValidator.js';


const popupEdit = document.querySelector('.popup_editform');
const popupAdd = document.querySelector('.popup_addform');
const popupView = document.querySelector('.popup_image');

const openPopupButton = document.querySelector('.profile__edit');
const openAddPopupButton = document.querySelector('.profile__add-button');

const editFormElement = document.querySelector('.popup__form_edit');
const addFormElement = document.querySelector('.popup__form_add');

const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');

const popupFieldName = popupEdit.querySelector('.popup__form-field_theme_name');
const popupFieldActivity = popupEdit.querySelector('.popup__form-field_theme_activity');

const popupFieldNameAdd = popupAdd.querySelector('.popup__form-field_theme_name');
const popupFieldWay = popupAdd.querySelector('.popup__form-field_theme_way');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__form-field_state_invalid',
  errorClass: 'error'
};

const cardFormValidation = new FormValidator(config, addFormElement);
const editFormValidation = new FormValidator(config, editFormElement);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsElement = document.querySelector('.elements');


const addCard = (data) => {
  cardsElement.prepend(data);
}

function submitEditProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = popupFieldName.value;
  profileActivity.textContent = popupFieldActivity.value;

  closePopup(popupEdit);
}

function createCard(data) {
  const card = new Card(data, '#card-template').generate();
  return card;
}

function submitAddCardForm(evt) {

  evt.preventDefault();


  const card = createCard({
    name: popupFieldNameAdd.value,
    link: popupFieldWay.value
  });

  addCard(card);

  popupFieldNameAdd.value = '';
  popupFieldWay.value = '';

  closePopup(popupAdd);
}

function hanleopenEditProfilePopup() {

  popupFieldName.value = profileName.textContent;
  popupFieldActivity.value = profileActivity.textContent;

  openPopup(popupEdit);
}

openPopupButton.addEventListener('click', hanleopenEditProfilePopup);

const button = popupAdd.querySelector(".popup__button");

function handleOpenAddCardPopup() {
  cardFormValidation.resetValidation();
  openPopup(popupAdd);
}

openAddPopupButton.addEventListener('click', handleOpenAddCardPopup);

const editProfileFormSubmitHandler = (e) => submitEditProfileForm(e);

editFormElement.addEventListener('submit', editProfileFormSubmitHandler);

const addCardFormSubmitHandler = (e) => submitAddCardForm(e);

addFormElement.addEventListener('submit', addCardFormSubmitHandler);


initialCards.forEach((item) => {
  const card = new createCard(item);
  addCard(card);
});


const enablePopupCloseButton = () => {

  const buttonCloseList = document.querySelectorAll('.popup__close');
  Array.from(buttonCloseList).forEach(buttonElement => {
    buttonElement.addEventListener('click', function () {

      closePopup(buttonElement.closest(".popup"));
    });
  })
}

enablePopupCloseButton();

const enablePopupClose = () => {

  const popupList = document.querySelectorAll('.popup');
  Array.from(popupList).forEach(popupElement => {

    popupElement.addEventListener('mousedown', function () {
      closePopup(popupElement);
    });

    popupElement.querySelector('.popup__content').addEventListener('mousedown', function (evt) {
      evt.stopPropagation();
    });

  })

}

enablePopupClose();

const enableValidation = (config) => {
  cardFormValidation.enableValidation();
  editFormValidation.enableValidation();
}

enableValidation(config);
