
export default class Card {
  constructor(options, selector) {
    this._name = options.data.name;
    this._link = options.data.link;
    this._likes = options.data.likes.length;
    this._ownerId = options.data.owner._id;
    this._selector = selector;
    this._handleCardClick = options.handleCardClick;
    this._listenerRemove = options.handleDeleteIconClick;
    this._listenerLike = options.handleLikeClick;
  }

  _getElement() {
    const cardElement = document.querySelector(this._selector)
      .content
      .querySelector('.elements__group')
      .cloneNode(true);
    return cardElement;
  }



  generate(id) {

    this._element = this._getElement();
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._element.querySelector('.elements__title').textContent = this._name;
    this._element.querySelector('.elements__like-count').textContent = this._likes;

    const cardDeleteButton = this._element.querySelector('.elements__button-remove');
    if(this._ownerId !== id) {
      cardDeleteButton.classList.add('elements__button-remove_disactivate');
    }


    this._setEventListeners();

    return this._element;
  }


  updateLikes(evt,likes) {
    console.log(likes);
    evt.target.classList.toggle('elements__like_active');
    evt.target.closest('.elements__like-group').querySelector('.elements__like-count').textContent = likes;
  }

  isLiked(evt) {
    return  evt.target.classList.contains('elements__like_active');
  }


  _setEventListeners() {
    this._element.querySelector('.elements__like').addEventListener('click',  (evt) => {
      this._listenerLike(evt,this)});

    this._element.querySelector('.elements__button-remove').addEventListener('click', this._listenerRemove);

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({link: this._link , name: this._name});
    });
  }


}
