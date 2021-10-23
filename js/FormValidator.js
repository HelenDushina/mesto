export default class FormValidator {
  constructor(config,formElement) {
    this._formElement= formElement;
    this._config = config;
  }

  _showError (errorElement,inputElement)  {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  }

  _hideError (errorElement,inputElement)  {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity (inputElement) {

    const isInputNotValid = !inputElement.validity.valid;
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-${this._config.errorClass}`);

    if(isInputNotValid) {
      this._showError(errorElement,inputElement);
    }
    else {
      this._hideError(errorElement,inputElement);
    }
  }

  _toggleButtonState() {
    const submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    const isFormValid = this._formElement.checkValidity();

    if(isFormValid) {
      submitButton.classList.remove(this._config.inactiveButtonClass);
      submitButton.disabled = false;
    }
    else {
      submitButton.classList.add(this._config.inactiveButtonClass);
      submitButton.disabled = 'disabled';
    }

  }

  _setEventListener () {

    const inputList = this._formElement.querySelectorAll(this._config.inputSelector);

    Array.from(inputList).forEach(inputElement =>{

      inputElement.addEventListener('input', (evt)=> {
        this._checkInputValidity(inputElement);

        this._toggleButtonState();
      })

    })

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
  }

  enableValidation() {
    const form = this._formElement;
         this._setEventListener(form,this.config);
  }

}
