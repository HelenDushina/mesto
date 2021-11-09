export const initialCards = [
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

export const formSection = '.elements';

export const popupEdit = document.querySelector('.popup_editform');
export const popupFieldName = popupEdit.querySelector('.popup__form-field_theme_name');
export const popupFieldActivity = popupEdit.querySelector('.popup__form-field_theme_activity');

export const nameEditProfile = document.querySelector('.profile__name');
export const jobEditProfile = document.querySelector('.profile__activity');

export const openPopupButton = document.querySelector('.profile__edit');
export const openAddPopupButton = document.querySelector('.profile__add-button');

export const editFormElement = document.querySelector('.popup__form_edit');
export const addFormElement = document.querySelector('.popup__form_add');


export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__form-field_state_invalid',
  errorClass: 'error'
};

