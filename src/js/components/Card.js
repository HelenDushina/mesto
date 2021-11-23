
export default class Card {
  constructor(options, selector) {
    this._name = options.data.name;
    this._link = options.data.link;
    this._likes = options.data.likes.length;
    this._selector = selector;
    this._handleCardClick = options.handleCardClick;
   // this._listenerLike = this._handleListenerLike.bind(this);
    //this._listenerRemove = this._handlelistenerRemove.bind(this);
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



  generate() {

    this._element = this._getElement();
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._element.querySelector('.elements__title').textContent = this._name;
    this._element.querySelector('.elements__like-count').textContent = this._likes;


    this._setEventListeners();

    return this._element;
  }

  // _handleListenerLike(evt) {
  //     evt.target.classList.toggle('elements__like_active');
  // }
  //
  // _handlelistenerRemove(evt) {
  //   evt.target.closest('.elements__group').remove();
  // }

  _setEventListeners() {
    this._element.querySelector('.elements__like').addEventListener('click',  this._listenerLike);

    this._element.querySelector('.elements__button-remove').addEventListener('click', this._listenerRemove);

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({link: this._link , name: this._name});
    });
  }


}
