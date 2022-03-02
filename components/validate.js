export const validationconfig = {
	formSelector: '.form',
	inputSelector: '.form__input',
	buttonSelector: '.form__button',
	buttonDisableClass: 'form__button_disabled',
	visibleErrorClass: 'form__input-error_visible',
	inputInvalidClass : 'input__element_invalid'
}

 function hideInputError(inputElement, errorElement, config) {
	inputElement.classList.remove(config.inputInvalidClass);
	errorElement.classList.remove(config.visibleErrorClass);
	errorElement.textContent = '';
 }

 function showInputError(inputElement, errorElement, errorMessage, config) {
	inputElement.classList.add(config.inputInvalidClass);
	errorElement.classList.add(config.visibleErrorClass);
	if (inputElement.id === "card-url-input") errorElement.textContent = "Не ссылка";
	else errorElement.textContent = errorMessage;
 }

 function disableButton (buttonElement, config) {
	 buttonElement.classList.add(config.buttonDisableClass);
	 buttonElement.disabled = true;
 }

 function enableButton (buttonElement, config) {
	buttonElement.classList.remove(config.buttonDisableClass);
	buttonElement.disabled = false;
}

function hasInvalidInput (inputList) {
	return inputList.some((inputElement) => {
		return inputElement.validity.valid === false;
	})
}

 function toggleButtonState (formElement, inputList, config) {
	 const buttonElement = formElement.querySelector(config.buttonSelector);

	 if (hasInvalidInput(inputList)) {
		 disableButton(buttonElement, config);
	 } else {
		 enableButton(buttonElement, config)
	 }
 }

function checkInputValidity (formElement, inputElement, config) {
	const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
	if (inputElement.validity.valid) {
		hideInputError(inputElement, errorElement, config);
	} else {
		showInputError(inputElement, errorElement, inputElement.validationMessage, config);
	}
}

function setEventListeners (formElement, config) {
	const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			checkInputValidity(formElement, inputElement, config);
			toggleButtonState(formElement, inputList, config);
		});
		toggleButtonState(formElement, inputList, config);
	});
}

export function enableValidation (config) {
	const formElements = Array.from(document.querySelectorAll(validationconfig.formSelector));	

	formElements.forEach((formElement) => {
		formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();			
		});
		setEventListeners(formElement, config);
	});
};