
const showError = (errorElement,inputElement,config) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
}

const hideError = (errorElement,inputElement,config) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.remove(config.inputErrorClass);
}

const checkInputValidity = (formElement, inputElement,config) => {
  const isInputNotValid = !inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.id}-${config.errorClass}`);

  if(isInputNotValid) {
    showError(errorElement,inputElement,config);
  }
  else {
    hideError(errorElement,inputElement,config);
  }
  }

const toggleButtonState = (button, isActive,config) => {
  if(isActive) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  }
  else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = 'disabled';
  }

}


const setEventListener = (formElement,config) => {

  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButton = formElement.querySelector(config.submitButtonSelector);


  Array.from(inputList).forEach(inputElement =>{

    inputElement.addEventListener('input', (evt)=> {
      checkInputValidity(formElement, inputElement,config);
      const isFormValid = formElement.checkValidity();
      toggleButtonState(submitButton,isFormValid,config);
    })

  })

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })
}

const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  Array.from(forms).forEach(formElement =>{
    setEventListener(formElement,config);

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

