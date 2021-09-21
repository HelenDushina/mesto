let popupedit = document.querySelector('.popup_editform');
let popupadd = document.querySelector('.popup_addform');
let openPopupButton = document.querySelector('.profile__edit');
let closePopupButton = document.querySelector('.popup__close');
let closePopupAddButton = document.querySelector('.popup__closeaddform');
let formElement = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');
let addPopupButton = document.querySelector('.profile__add-button');
let addFormElement = document.querySelector('.popup__form_add');

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




function openPopup(event, popup) {
  if (popup.classList.contains('popup_editform')){
  let popupFieldName = popup.querySelector('.popup__form-field_theme_name');
  let popupFieldActivity = popup.querySelector('.popup__form-field_theme_activity');
  popupFieldName.value = profileName.textContent;
  popupFieldActivity.value = profileActivity.textContent;
  }
  popup.classList.toggle('popup_opend');
}

function closePopup(event=undefined, popup) {

  popup.classList.toggle('popup_opend');
}


function formSubmitHandler (evt,popup) {
  evt.preventDefault();

  let popupFieldName = popup.querySelector('.popup__form-field_theme_name');
  let popupFieldActivity = popup.querySelector('.popup__form-field_theme_activity');

  let nameInput = popupFieldName.value;
  let jobInput = popupFieldActivity.value;

  profileName.textContent = nameInput;
  profileActivity.textContent = jobInput;

  closePopup(undefined, popup);
}

const cardsElement = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

const removePostHandler = (event) => {
  event.target.closest('.elements__group').remove();
};

const addcard = (data)=>{
  const cardElement = cardTemplate.querySelector('.elements__group').cloneNode(true);
  cardElement.querySelector('.elements__image').src = data.link;
  cardElement.querySelector('.elements__image').alt = data.name;
  cardElement.querySelector('.elements__title').textContent = data.name;
  cardsElement.prepend(cardElement);
  cardElement.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  });
  cardElement.querySelector('.elements__button-remove').addEventListener('click', removePostHandler);
}

function addFormHandler (evt, popup) {

  evt.preventDefault();

  let popupFieldName = popup.querySelector('.popup__form-field_theme_name');
  let popupFieldWay = popup.querySelector('.popup__form-field_theme_way');

  addcard({
    name: popupFieldName.value,
    link: popupFieldWay.value
  });


  closePopup(undefined, popup);
}

const clickHandler = (e) => openPopup(e, popupedit);

openPopupButton.addEventListener('click', clickHandler);

const clickadd = (e) => openPopup(e, popupadd);

addPopupButton.addEventListener('click', clickadd);

const clickclosepopup = (e) => closePopup(e, popupedit);

closePopupButton.addEventListener('click', clickclosepopup);

const clickcloseaddpopup = (e) => closePopup(e, popupadd);

closePopupAddButton.addEventListener('click', clickcloseaddpopup);

const clicksubmit = (e) => formSubmitHandler(e, popupedit);

formElement.addEventListener('submit', clicksubmit);

const clicksubmitadd = (e) => addFormHandler(e, popupadd);

addFormElement.addEventListener('submit', clicksubmitadd);

initialCards.forEach((card)=>{
  addcard(card);
}
)
