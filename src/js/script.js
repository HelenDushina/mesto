import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWhithForm.js';
import PopupWithSubmit from './components/PopupWhithSubmit.js';
import UserInfo from './components/UserInfo.js';
import Api from './components/Api.js';
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
  jobEditProfile,
  avatarPic,
  openAvatarButton,
  AvatarProfile
} from './utils/constants.js';


const cardFormValidation = new FormValidator(config, addFormElement);
const editFormValidation = new FormValidator(config, editFormElement);

const userInfo = new UserInfo(nameEditProfile,jobEditProfile);

const popupWithImage = new PopupWithImage('.popup_image');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: {
    authorization: '3f3feb77-bf03-423c-a751-ec6bde61064d',
    'Content-Type': 'application/json'
  }
});

function сreateCard(cardItem,id) {

  const options = {data: cardItem,
    handleCardClick: ({link, name}) => {
      popupWithImage.openPopup({link, name});
      popupWithImage.setEventListeners();
    }
   ,
    handleLikeClick: (card) => {
    if(card.target.classList.contains('elements__like_active')) {

      const responseLike = api.removeLikeCard(cardItem._id)
        .then(res=> {
          console.log(res);
          card.target.classList.remove('elements__like_active');
          card.target.closest('.elements__like-group').querySelector('.elements__like-count').textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
    else
    {
      const responseLike = api.likeCard(cardItem._id)
        .then(res=> {
          console.log(res);

          card.target.classList.add('elements__like_active');
          card.target.closest('.elements__like-group').querySelector('.elements__like-count').textContent= res.likes.length;
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });

    }
  },
    handleDeleteIconClick: (card) => {
      const deletePopup = new PopupWithSubmit(
        '.popup_delete',
        () => {
          // удалить карточку
          const responseDelete = api.deleteCard(cardItem._id)
            .then(res=> {
              console.log(res);
              card.target.closest('.elements__group').remove();
            })
            .catch((err) => {
              console.log(err); // выведем ошибку в консоль
            });
        }
      );
      deletePopup.setEventListeners();
      deletePopup.openPopup();
    }
   }

  const card = new Card(options, '#card-template');
  const cardElement = card.generate();
  const cardDeleteButton = cardElement.querySelector('.elements__button-remove');
  if(cardItem.owner._id !== id) {
    cardDeleteButton.classList.add('elements__button-remove_disactivate');
  }

  return cardElement;
}



const cardList = new Section({
    renderer: (cardItem,id) => {
      const cardElement = сreateCard(cardItem,id);
      cardList.addItem(cardElement);
    },
  },
  formSection,

);

const responseUser = api.getUser()
  .then(res=> {
    //отображаем инфо о пользователе
    console.log(res);
    nameEditProfile.textContent = res.name;
    jobEditProfile.textContent = res.about;
    avatarPic.src = res.avatar;
    userInfo.setUserInfo(nameEditProfile.textContent,jobEditProfile.textContent);
    //логика редактирования пользователя
    const editPopup = new PopupWithForm(
      '.popup_editform',
      (formData) => {
        renderLoading(true,'.popup_editform');
        const responseEditUser = api.editUser({name: formData.name,about: formData.activity})
          .then(res=> {
            console.log(res);
            userInfo.setUserInfo(formData.name,formData.activity);
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          })
          .finally(() => {
            renderLoading(false,'.popup_editform');
          });
      }
    );
    editPopup.setEventListeners();

    function hanleOpenEditProfilePopup() {
      editFormValidation.resetValidation();
      const userData = userInfo.getUserInfo();
      popupFieldName.value = userData.name;
      popupFieldActivity.value = userData.job;
      editPopup.openPopup();
    }
    openPopupButton.addEventListener('click', hanleOpenEditProfilePopup);

    //логика обновления аватара
    const avatarPopup = new PopupWithForm(
      '.popup_avatarform',
      (formData) => {
        renderLoading(true,'.popup_avatarform');
        const responseAvatar = api.changeAvatar(formData)
          .then(res=> {
            console.log(res);
            AvatarProfile.src = res.avatar;
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          })
          .finally(() => {
            renderLoading(false,'.popup_avatarform');
          });
      }
    );
    avatarPopup.setEventListeners();

    function handleOpenAvatarPopup() {
      avatarPopup.openPopup();
    }
    openAvatarButton.addEventListener('click', handleOpenAvatarPopup);


    //отображаем начальные карточки
    const responce = api.getInitialCards()
      .then(initialCards=> {
        console.log(initialCards);
        //вставляем карточки в дом
        cardList.renderItems(initialCards,res._id);

        //логика создания новой карточки
        const addPopup = new PopupWithForm(
          '.popup_addform',
          (formData) => {

            const responseSaveCard = api.addCard(formData)
              .then(res=> {
                console.log(res);
                const cardElement = сreateCard(res,res.owner._id);
                cardList.addItem(cardElement);
              })
              .catch((err) => {
                console.log(err); // выведем ошибку в консоль
              });
          }
        );
        addPopup.setEventListeners();

        function handleOpenAddCardPopup() {
          cardFormValidation.resetValidation();
          addPopup.openPopup();
        }

        openAddPopupButton.addEventListener('click', handleOpenAddCardPopup);

      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });



const enableValidation = () => {
  cardFormValidation.enableValidation();
  editFormValidation.enableValidation();
}

enableValidation();


function renderLoading(isLoading,popupFormSelector) {

  const button  = document.querySelector(popupFormSelector).querySelector('.popup__button');

  if(isLoading) {
    button.textContent = button.textContent + '...';
  }
  else {
    button.textContent = button.textContent.slice(0, -3);
  }
}
