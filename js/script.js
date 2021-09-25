const popupedit = document.querySelector('.popup_editform');
const popupadd = document.querySelector('.popup_addform');
const popupview = document.querySelector('.popup_image');

const openPopupButton = document.querySelector('.profile__edit');
const openAddPopupButton = document.querySelector('.profile__add-button');

const closePopupButton = document.querySelector('.popup__close');
const closePopupAddButton = document.querySelector('.popup__closeaddform');
const closePopupViewButton = document.querySelector('.popup__closeimageform');

const formElement = document.querySelector('.popup__form');
const addFormElement = document.querySelector('.popup__form_add');

let profileName = document.querySelector('.profile__name');
let profileActivity = document.querySelector('.profile__activity');

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
const cardTemplate = document.querySelector('#card-template').content;

const removePostHandler = (event) => {
  event.target.closest('.elements__group').remove();
};

function handlePreviewPicture (data) {
  const popupImage = popupview.querySelector('.popup__image');
  const popupText = popupview.querySelector('.popup__text');
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupText.textContent = data.name;
  openPopup(undefined, popupview);
}

const addCard = (data)=>{
  const cardElement = cardTemplate.querySelector('.elements__group').cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__image');
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector('.elements__title').textContent = data.name;
  cardsElement.prepend(cardElement);
  cardElement.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  });
  cardElement.querySelector('.elements__button-remove').addEventListener('click', removePostHandler);
  cardImage.addEventListener('click', () => handlePreviewPicture(data));
}

function openPopup(event, popup) {

  if (popup.classList.contains('popup_editform')){
    let popupFieldName = popup.querySelector('.popup__form-field_theme_name');
    let popupFieldActivity = popup.querySelector('.popup__form-field_theme_activity');
    popupFieldName.value = profileName.textContent;
    popupFieldActivity.value = profileActivity.textContent;
  }

  popup.classList.toggle('popup_opend');
}

function closePopup(event, popup) {

  popup.classList.toggle('popup_opend');
}


function handleformSubmit (evt,popup) {
  evt.preventDefault();

  let popupFieldName = popup.querySelector('.popup__form-field_theme_name');
  let popupFieldActivity = popup.querySelector('.popup__form-field_theme_activity');

  let nameInput = popupFieldName.value;
  let jobInput = popupFieldActivity.value;

  profileName.textContent = nameInput;
  profileActivity.textContent = jobInput;

  closePopup(undefined, popup);
}




function addFormHandler (evt, popup) {

  evt.preventDefault();

  let popupFieldName = popup.querySelector('.popup__form-field_theme_name');
  let popupFieldWay = popup.querySelector('.popup__form-field_theme_way');

  addCard({
    name: popupFieldName.value,
    link: popupFieldWay.value
  });

  popupFieldName.value ='';
  popupFieldWay.value = '';

  closePopup(undefined, popup);
}

const clickHandler = (e) => openPopup(e, popupedit);

openPopupButton.addEventListener('click', clickHandler);

const clickadd = (e) => openPopup(e, popupadd);

openAddPopupButton.addEventListener('click', clickadd);

const clickclosepopup = (e) => closePopup(e, popupedit);

closePopupButton.addEventListener('click', clickclosepopup);

const clickcloseaddpopup = (e) => closePopup(e, popupadd);

closePopupAddButton.addEventListener('click', clickcloseaddpopup);

const clickcloseimagepopup = (e) => closePopup(e, popupview);

closePopupViewButton.addEventListener('click', clickcloseimagepopup);

const clicksubmit = (e) => handleformSubmit(e, popupedit);

formElement.addEventListener('submit', clicksubmit);

const clicksubmitadd = (e) => addFormHandler(e, popupadd);

addFormElement.addEventListener('submit', clicksubmitadd);

initialCards.forEach((card)=>{
  addCard(card);
}
)
