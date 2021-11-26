export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._listenerBind = this._handleEscClose.bind(this);
  }

  openPopup() {
    this._popup.classList.add('popup_opend');
    document.addEventListener('keydown', this._listenerBind);
  }

  closePopup() {
    this._popup.classList.remove('popup_opend');
    this._removeListeners();

  }

  _handleEscClose(evt) {
    if (evt.key !== 'Escape') {
      return;
    }
    this.closePopup();
  }
  _removeListeners() {
    document.removeEventListener('keydown',  this._listenerBind);
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-icon')) {
        this.closePopup();
      }
    });
    // document.addEventListener('keydown', this._listenerBind);

  }

}
