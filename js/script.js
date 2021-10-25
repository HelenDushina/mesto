import Card from '../js/card.js';
import { openPopup, closePopup, closePopupByEsc} from '../js/utils.js'


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


const addCard = (data)=>{
  const card = data.generate();
  cardsElement.prepend(card);
}

function submitEditProfileForm (evt) {
  evt.preventDefault();

  profileName.textContent =  popupFieldName.value;
  profileActivity.textContent = popupFieldActivity.value;

  closePopup(popupEdit);
}

function submitAddCardForm (evt) {

  evt.preventDefault();

  const card = new Card({
      name: popupFieldNameAdd.value,
      link: popupFieldWay.value
     }, '#card-template');
  addCard(card);


  popupFieldNameAdd.value ='';
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

  button.classList.add("popup__button_invalid");
  button.disabled = 'disabled';

  openPopup(popupAdd);

}

openAddPopupButton.addEventListener('click', handleOpenAddCardPopup);

const editProfileFormSubmitHandler = (e) => submitEditProfileForm(e);

editFormElement.addEventListener('submit', editProfileFormSubmitHandler);

const addCardFormSubmitHandler = (e) => submitAddCardForm(e);

addFormElement.addEventListener('submit', addCardFormSubmitHandler);


initialCards.forEach((item)=>{
  const card = new Card(item, '#card-template');
  addCard(card);
  });


const enablePopupCloseButton = () => {

  const buttonCloseList = document.querySelectorAll('.popup__close');
  Array.from(buttonCloseList).forEach(buttonElement =>{
    buttonElement.addEventListener('click',function() {

      closePopup(buttonElement.closest(".popup"));
    });
  })
}

enablePopupCloseButton();

const enablePopupClose = () => {

  const popupList = document.querySelectorAll('.popup');
  Array.from(popupList).forEach(popupElement =>{

    popupElement.addEventListener('mousedown',function() {

      closePopup(popupElement);
    });

    popupElement.querySelector('.popup__content').addEventListener('mousedown', function(evt) {
      evt.stopPropagation();
    });

  })

}

enablePopupClose();
