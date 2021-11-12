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

function CreateCard(cardItem) {
  const card = new Card(cardItem, '#card-template', handleCardClick);
  const cardElement = card.generate();
  return cardElement;
}

const cardList = new Section({
    data: initialCards,
    renderer: (cardItem) => {
      const cardElement = CreateCard(cardItem);
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


const addPopup = new PopupWithForm(
  '.popup_addform',
  (formData) => {
    const cardList = new Section({
        data: [formData],
        renderer: (cardItem) => {
          const cardElement = CreateCard(cardItem);
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

  editFormValidation.resetValidation();

  const getUserInfo = userInfo.getUserInfo();

  popupFieldName.value = getUserInfo.name;
  popupFieldActivity.value = getUserInfo.job;

  editPopup.openPopup();
  editPopup.setEventListeners();
}

openPopupButton.addEventListener('click', hanleopenEditProfilePopup);


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
