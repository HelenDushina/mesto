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
      this._handlePopupSubmit(this.CardID, this.card);

    })
  }


  openPopup(CardID,card) {
    this.card = card;
    this.CardID = CardID;
    super.openPopup();
  }

}
