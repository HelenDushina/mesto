import Card from '../js/components/Card.js';
import FormValidator from '../js/components/FormValidator.js';
import Section from '../js/components/Section.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWhithForm.js';
import PopupWithSubmit from '../js/components/PopupWhithSubmit.js';
import UserInfo from '../js/components/UserInfo.js';
import Api from '../js/components/Api.js';
import './index.css';

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
  AvatarProfile,
  avatarFormElement
} from '../js/utils/constants.js';


const cardFormValidation = new FormValidator(config, addFormElement);
const editFormValidation = new FormValidator(config, editFormElement);
const avatarFormValidation = new FormValidator(config, avatarFormElement);

const userInfo = new UserInfo(nameEditProfile,jobEditProfile,AvatarProfile);

const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: {
    authorization: '3f3feb77-bf03-423c-a751-ec6bde61064d',
    'Content-Type': 'application/json'
  }
});

const deletePopup = new PopupWithSubmit(
  '.popup_delete',
  (cardID,card) => {
    // удалить карточку
    const responseDelete = api.deleteCard(cardID)
      .then(res=> {
        console.log(res);
        card.target.closest('.elements__group').remove();
        deletePopup.closePopup();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
);
deletePopup.setEventListeners();

const editPopup = new PopupWithForm(
  '.popup_editform',
  (formData) => {
    renderLoading(true,'.popup_editform');
    const responseEditUser = api.editUser({name: formData.name,about: formData.activity})
      .then(res=> {
        console.log(res);
        userInfo.setUserInfo(formData.name,formData.activity, res.avatar);
        editPopup.closePopup();
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

const avatarPopup = new PopupWithForm(
  '.popup_avatarform',
  (formData) => {
    renderLoading(true,'.popup_avatarform');
    const responseAvatar = api.changeAvatar(formData)
      .then(res=> {
        console.log(res);
        userInfo.setUserInfo(res.name,res.about, res.avatar);
        avatarPopup.closePopup();
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

const addPopup = new PopupWithForm(
  '.popup_addform',
  (formData) => {
    renderLoading(true,'.popup_addform');
    const responseSaveCard = api.addCard(formData)
      .then(res=> {
        console.log(res);
        const cardElement = сreateCard(res,res.owner._id);
        cardList.addItem(cardElement);
        addPopup.closePopup();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        renderLoading(false,'.popup_addform');
      });
  }
);
addPopup.setEventListeners();

function сreateCard(cardItem,id) {

  const options = {data: cardItem,
    handleCardClick: ({link, name}) => {
      popupWithImage.openPopup({link, name});
    }
   ,
    handleLikeClick: (evt,cardElement) => {
     if(cardElement.isLiked(evt)) {
      const responseLike = api.removeLikeCard(cardItem._id)
         .then(res=> {
          console.log(res);
           cardElement.updateLikes(evt,res.likes.length);
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
          cardElement.updateLikes(evt,res.likes.length);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });

    }
  },
    handleDeleteIconClick: (card) => {
        deletePopup.openPopup(cardItem._id,card);
    }
   }

  const card = new Card(options, '#card-template');
  const cardElement = card.generate(id);


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

    userInfo.setUserInfo(res.name,res.about,res.avatar);
    //логика редактирования пользователя

    function hanleOpenEditProfilePopup() {
      editFormValidation.resetValidation();
      const userData = userInfo.getUserInfo();
      popupFieldName.value = userData.name;
      popupFieldActivity.value = userData.job;
      editPopup.openPopup();
    }
    openPopupButton.addEventListener('click', hanleOpenEditProfilePopup);

    //логика обновления аватара

    function handleOpenAvatarPopup() {
      avatarFormValidation.resetValidation();
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
  avatarFormValidation.enableValidation();
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
