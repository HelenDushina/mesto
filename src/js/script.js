import Card from './components/Card.js';

import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWhithForm.js';
import UserInfo from './components/UserInfo.js';
import '../pages/index.css';

import {
  initialCards,
  formSection,
  popupEdit,
  popupFieldName,
  popupFieldActivity,
  openPopupButton,
  openAddPopupButton,
  editFormElement,
  addFormElement,
  config,
  nameEditProfile,
  jobEditProfile
} from './utils/constants.js';


const cardFormValidation = new FormValidator(config, addFormElement);
const editFormValidation = new FormValidator(config, editFormElement);


const cardList = new Section({
    data: initialCards,
    renderer: (cardItem) => {
      function handleCardClick() {
        const popupWithImage = new PopupWithImage(cardItem,'.popup_image');
        popupWithImage.openPopup();
        popupWithImage.setEventListeners();
      };
      const card = new Card(cardItem, '#card-template',handleCardClick)
      const cardElement = card.generate();
      cardList.addItem(cardElement);
    },
  },
  formSection
);

cardList.renderItems();

const editPopup = new PopupWithForm(
  '.popup_editform',
  (formData) => {
    const userInfo = new UserInfo(nameEditProfile,jobEditProfile);
    userInfo.setUserInfo(popupFieldName.value,popupFieldActivity.value);
    userInfo.updateUserInfo();
  }
);

editPopup.setEventListeners();

const addPopup = new PopupWithForm(
  '.popup_addform',
  (formData) => {
    const cardList = new Section({
        data: [formData],
        renderer: (cardItem) => {
          function handleCardClick() {
            const popupWithImage = new PopupWithImage(cardItem,'.popup_image');
            popupWithImage.openPopup();
            popupWithImage.setEventListeners();
          };
          const card = new Card(cardItem, '#card-template', handleCardClick);
          const cardElement = card.generate();
          cardList.addItem(cardElement);
        },
      },
      formSection
    );
    cardList.renderItems();
  }
);

addPopup.setEventListeners();


function hanleopenEditProfilePopup() {

  const userInfo = new UserInfo(nameEditProfile, jobEditProfile);
  const getUserInfo = userInfo.getUserInfo();

  popupFieldName.value = getUserInfo.name;
  popupFieldActivity.value = getUserInfo.job;

  const popup = new Popup('.popup_editform');
  popup.openPopup();
  popup.setEventListeners();
}

openPopupButton.addEventListener('click', hanleopenEditProfilePopup);


function handleOpenAddCardPopup() {
  cardFormValidation.resetValidation();
  const popup = new Popup('.popup_addform');
  popup.openPopup();
}

openAddPopupButton.addEventListener('click', handleOpenAddCardPopup);


const enableValidation = (config) => {
  cardFormValidation.enableValidation();
  editFormValidation.enableValidation();
}

enableValidation(config);

const userInfo = new UserInfo(nameEditProfile, jobEditProfile);
userInfo.setUserInfo(nameEditProfile.textContent,jobEditProfile.textContent);
