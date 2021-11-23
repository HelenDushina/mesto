import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {

  constructor(selector,handlePopupSubmit) {
    super(selector);
    this._handlePopupSubmit = handlePopupSubmit;
  }


  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlePopupSubmit();
      this.closePopup();
      evt.target.reset();
    })
  }

  closePopup() {
    super.closePopup();
  }

  openPopup() {
    super.openPopup();
  }

}
