export const initialCards = [
  {
    name: 'Лепель',
    link: 'https://scezhki-assets.s3.eu-central-1.amazonaws.com/media/cache/f7/68/f768e75654267c0ae4cf61addc14915c.jpg'
  },
  {
    name: 'Ельня',
    link: 'https://scezhki-assets.s3.eu-central-1.amazonaws.com/media/cache/e4/16/e41688e4bfb9eaae2041610bb2a6b3cd.jpg'
  },
  {
    name: 'Мосар',
    link: 'https://scezhki-assets.s3.eu-central-1.amazonaws.com/media/cache/74/a6/74a6908d5e1ea32c57c162f823b493e5.jpg'
  },

];

export const formSection = '.elements';

export const popupEdit = document.querySelector('.popup_editform');
export const popupFieldName = popupEdit.querySelector('.popup__form-field_theme_name');
export const popupFieldActivity = popupEdit.querySelector('.popup__form-field_theme_activity');

export const nameEditProfile = document.querySelector('.profile__name');
export const jobEditProfile = document.querySelector('.profile__activity');
export const avatarPic = document.querySelector('.profile__avatar');

export const openPopupButton = document.querySelector('.profile__edit');
export const openAddPopupButton = document.querySelector('.profile__add-button');
export const openAvatarButton = document.querySelector('.profile__avatar-edit');
export const AvatarProfile = document.querySelector('.profile__avatar');

export const editFormElement = document.querySelector('.popup__form_edit');
export const addFormElement = document.querySelector('.popup__form_add');
export const avatarFormElement = document.querySelector('.popup__form_avatar');




export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__form-field_state_invalid',
  errorClass: 'error'
};

