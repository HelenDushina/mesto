export default class Utils {
  constructor(popup) {
    this._popup = popup;
  }

  openPopup() {
    this._popup.classList.add('popup_opend');
    document.addEventListener('keydown', this.closePopupByEsc);
  }

  closePopup() {
    this._popup.classList.remove('popup_opend');
    document.removeEventListener('keydown', this.closePopupByEsc);
  }

  closePopupByEsc(evt) {
    if (evt.key !== 'Escape') {
      return;
    }
    const openedPopup = document.querySelector('.popup_opend');
    openedPopup.classList.remove('popup_opend');
    document.removeEventListener('keydown', this.closePopupByEsc);
  }

}
