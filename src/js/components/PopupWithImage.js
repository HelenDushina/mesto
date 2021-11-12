import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor(selector) {

    super(selector);
    // this._name = data.name;
    // this._link = data.link;
  }

  openPopup(data) {

    this._popup.querySelector('.popup__image').src = data.link;
    this._popup.querySelector('.popup__image').alt =  data.name;
    this._popup.querySelector('.popup__text').textContent=  data.name;

    super.openPopup();
  }
}
