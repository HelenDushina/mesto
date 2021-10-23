export default class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
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
    this._element.querySelector('.elements__image').src = this._link;
    this._element.querySelector('.elements__image').alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
  _setEventListeners() {
    this._element.querySelector('.elements__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('elements__like_active');
    });

    this._element.querySelector('.elements__button-remove').addEventListener('click', function (evt) {
      evt.target.closest('.elements__group').remove();
    });

    this._element.querySelector('.elements__image').addEventListener('click', () => handlePreviewPicture(data));
  }

  _handlePreviewPicture(data) {

    const popupView = document.querySelector('.popup_image');
    const popupImage = popupView.querySelector('.popup__image');
    const popupText = popupView.querySelector('.popup__text');

    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupText.textContent = data.name;
    //openPopup(popupView);
  }

}
