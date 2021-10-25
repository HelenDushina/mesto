
  export function openPopup(popup) {
    popup.classList.add('popup_opend');
    document.addEventListener('keydown', closePopupByEsc);
  }

  export function closePopup(popup) {
    popup.classList.remove('popup_opend');
    document.removeEventListener('keydown', closePopupByEsc);
  }

  export function closePopupByEsc(evt) {
    if (evt.key !== 'Escape') {
      return;
    }
    const openedPopup = document.querySelector('.popup_opend');
    closePopup(openedPopup);
  }


