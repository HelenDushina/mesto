import Card from './components/Card.js';

import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';

import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWhithForm.js';
import UserInfo from './components/UserInfo.js';
import '../pages/index.css';

import {
  initialCards,
  formSection,

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

const userInfo = new UserInfo(nameEditProfile,jobEditProfile);

const popupWithImage = new PopupWithImage('.popup_image');

const handleCardClick = ({link, name}) => {
  popupWithImage.openPopup({link, name});
  popupWithImage.setEventListeners();
};

function сreateCard(cardItem) {
  const card = new Card(cardItem, '#card-template', handleCardClick);
  const cardElement = card.generate();
  return cardElement;
}

const cardList = new Section({
    data: initialCards,
    renderer: (cardItem) => {
      const cardElement = сreateCard(cardItem);
      cardList.addItem(cardElement);
    },
  },
  formSection
);

cardList.renderItems();

const editPopup = new PopupWithForm(
  '.popup_editform',
  (formData) => {
      userInfo.setUserInfo(popupFieldName.value,popupFieldActivity.value);
  }
);
editPopup.setEventListeners();

const addPopup = new PopupWithForm(
  '.popup_addform',
  (formData) => {
    const cardElement = сreateCard(formData);
    cardList.addItem(cardElement);
  }
);

addPopup.setEventListeners();


function hanleOpenEditProfilePopup() {

  editFormValidation.resetValidation();

  const userData = userInfo.getUserInfo();

  popupFieldName.value = userData.name;
  popupFieldActivity.value = userData.job;

  editPopup.openPopup();
  // editPopup.setEventListeners();
}

openPopupButton.addEventListener('click', hanleOpenEditProfilePopup);


function handleOpenAddCardPopup() {
  cardFormValidation.resetValidation();
  addPopup.openPopup();
}

openAddPopupButton.addEventListener('click', handleOpenAddCardPopup);


const enableValidation = () => {
  cardFormValidation.enableValidation();
  editFormValidation.enableValidation();
}

enableValidation();

userInfo.setUserInfo(nameEditProfile.textContent,jobEditProfile.textContent);
