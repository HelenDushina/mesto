import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor(data,selector) {

    super(selector);
    this._name = data.name;
    this._link = data.link;
  }

  openPopup() {

    this._popup.querySelector('.popup__image').src = this._link;
    this._popup.querySelector('.popup__image').alt =  this._name;
    this._popup.querySelector('.popup__text').textContent=  this._name;

    super.openPopup();
  }
}
