
import FormValidator from '../js/FormValidator.js';

const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  Array.from(forms).forEach(formElement => {
    const validation = new FormValidator(config, formElement);
    validation.enableValidation();
  })
}

enableValidation(
  {formSelector: '.popup__form',
  inputSelector: '.popup__form-field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__form-field_state_invalid',
  errorClass: 'error'}
);
