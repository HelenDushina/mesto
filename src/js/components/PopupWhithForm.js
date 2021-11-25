import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

  constructor(selector,handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {

    this._inputList = this._popup.querySelectorAll('.popup__form-field');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }



}
