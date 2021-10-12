const popupEdit = document.querySelector('.popup_editform');
const popupAdd = document.querySelector('.popup_addform');
const popupView = document.querySelector('.popup_image');

const openPopupButton = document.querySelector('.profile__edit');
const openAddPopupButton = document.querySelector('.profile__add-button');

const closePopupButton = document.querySelector('.popup__close');
const closePopupAddButton = document.querySelector('.popup__closeaddform');
const closePopupViewButton = document.querySelector('.popup__closeimageform');

const editFormElement = document.querySelector('.popup__form_edit');
const addFormElement = document.querySelector('.popup__form_add');

const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');

const popupImage = popupView.querySelector('.popup__image');
const popupText = popupView.querySelector('.popup__text');

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
const cardTemplate = document.querySelector('#card-template').content;

const removePostHandler = (event) => {
  event.target.closest('.elements__group').remove();
};

function handlePreviewPicture (data) {

  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupText.textContent = data.name;
  openPopup(popupView);
}

function createCard (data) {
  const cardElement = cardTemplate.querySelector('.elements__group').cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__image');
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector('.elements__title').textContent = data.name;
  cardElement.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  });
  cardElement.querySelector('.elements__button-remove').addEventListener('click', removePostHandler);
  cardImage.addEventListener('click', () => handlePreviewPicture(data));
  return cardElement;
}

const addCard = (data)=>{
  const card = createCard (data);
  cardsElement.prepend(card);
}

//function getlistener(popup) {
// return function listener(event) {
//    if(event.keyCode === 27) {
//      closePopup(popup);
//    }
//  }
//}

function closePopupByEsc(evt) {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opend');
    closePopup(openedPopup);
  }
}

//const setAddEventListener = (popup) => {
//  document.addEventListener('keydown', getlistener(popup));
//}

//const removeEventListener = (popup) => {
//  document.removeEventListener('keydown', getlistener(popup));
//}

function openPopup(popup) {
  popup.classList.add('popup_opend');
  //setAddEventListener(popup);
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opend');
  //removeEventListener(popup);
  document.removeEventListener('keydown', closePopupByEsc);
}

function submitEditProfileForm (evt) {
  evt.preventDefault();

  profileName.textContent =  popupFieldName.value;
  profileActivity.textContent = popupFieldActivity.value;

  closePopup(popupEdit);
}

function submitAddCardForm (evt) {

  evt.preventDefault();

  addCard({
    name: popupFieldNameAdd.value,
    link: popupFieldWay.value
  });

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

function handleOpenAddCardPopup() {
  const button = popupAdd.querySelector(".popup__button");
  button.classList.add("popup__button_invalid");
  button.disabled = 'disabled';
  openPopup(popupAdd);
}

openAddPopupButton.addEventListener('click', handleOpenAddCardPopup);

const editProfileFormSubmitHandler = (e) => submitEditProfileForm(e);

editFormElement.addEventListener('submit', editProfileFormSubmitHandler);

const addCardFormSubmitHandler = (e) => submitAddCardForm(e);

addFormElement.addEventListener('submit', addCardFormSubmitHandler);

initialCards.forEach((card)=>{
  addCard(card);
}
)

const enablePopupCloseButton = () => {

  const buttonCloseList = document.querySelectorAll('.popup__close');
    Array.from(buttonCloseList).forEach(buttonElement =>{
      buttonElement.addEventListener('click',function() {
      closePopup(buttonElement.parentElement.parentElement);
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
