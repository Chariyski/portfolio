const validationRules = {
  emailPattern: /^(([a-zA-Z0-9._-])||([a-zA-Z0-9._-]+\/))+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  minFieldLength: 1
};

/**
 * Contact form
 */
class ContactForm {

  /**
   * @constructor
   * @param {string} elementId - Form element ID.
   */
  constructor(elementId) {
    this._contactForm = document.getElementById(elementId);
    this._contactFormSubmitButton = this._contactForm.querySelector('[data-contact-form="submit"]');
    this._crateContactFormMessageContainer();
    this._initialiseEventHandlers();
  }

  /**
   * Validate field input.
   * @param {Element} element - input or textarea DOM element.
   * @returns {boolean}
   */
  isFieldValid(element) {
    const trimmedElementValue = element.value.trim();
    let isFieldValid = true;

    if (element.getAttribute('name') === 'email' && validationRules.emailPattern.test(trimmedElementValue) === false) {
      isFieldValid = false;
    } else if (trimmedElementValue.length < validationRules.minFieldLength) {
      isFieldValid = false;
    }

    return isFieldValid;
  }

  /**
   * Validate all form fields.
   * @returns {boolean}
   */
  isFormValid() {
    const fieldsForValidation = Array.prototype.slice.call(this._contactForm.querySelectorAll('[name]'));

    return fieldsForValidation.every(this.isFieldValid.bind(this));
  }

  /**
   * Create container for state massages.
   * @private
   * @returns {Element} Reference to the message container
   */
  _crateContactFormMessageContainer() {
    const messageContainer = document.createElement('p');

    messageContainer.setAttribute('data-contact-form', 'message');
    this._contactForm.appendChild(messageContainer);

    this._contactFormMessageContainer = messageContainer;
  }

  /**
   * Attach event handlers.
   * @private
   * @returns {undefined}
   */
  _initialiseEventHandlers() {
    this._contactForm.addEventListener('submit', this._formSubmitHandler.bind(this), false);
    this._contactForm.addEventListener('blur', this._visualFiledValidation.bind(this), true);
  }

  /**
   * Add/remove visual indication on field validation, depending if the field is valid or not.
   * @param {Object} event - Blur event
   * @private
   * @returns {undefined}
   */
  _visualFiledValidation(event) {
    if (event.target.nodeName === 'BUTTON') {
      return;
    }

    if (this.isFieldValid(event.target) === false) {
      event.target.classList.add('is-invalid');
    } else {
      event.target.classList.remove('is-invalid');
    }
  }

  /**
   * Send mail through Formspee API.
   * @private
   * @returns {undefined}
   */
  _sendMailWithFormspree() {
    const xhttp = new XMLHttpRequest();
    const messageData = {
      subject: this._contactForm.subject,
      name: this._contactForm.name,
      email: this._contactForm.email,
      message: this._contactForm.message,
      _gotcha: this._contactForm.querySelector('[data-contact-form="gotcha"]').value
    };

    xhttp.open('POST', 'https://formspree.io/kr.chariyski@gmail.com', true);
    xhttp.setRequestHeader('Content-type', 'application/json');

    xhttp.addEventListener('progress', this._formProgressHandler.bind(this), false);
    xhttp.addEventListener('load', this._formLoadHandler.bind(this, xhttp), false);
    xhttp.addEventListener('error', this._formErrorHandler.bind(this), false);

    xhttp.send(JSON.stringify(messageData));
  }

  /**
   * Progress event handler.
   * @private
   * @returns {undefined}
   */
  _formProgressHandler() {
    this._contactFormSubmitButton.setAttribute('disabled', true);
  }

  /**
   * Load event handler.
   * @param {object} xhttp - XMLHttpRequest object.
   * @private
   * @returns {undefined}
   */
  _formLoadHandler(xhttp) {
    const response = JSON.parse(xhttp.response);

    if (response.success) {
      this._contactFormSubmitButton.parentNode.removeChild(this._contactFormSubmitButton);
      this._contactFormMessageContainer.innerText = 'The message was send successful.';
    }
  }

  /**
   * Error event handler.
   * @param {object} xhttp - XMLHttpRequest object.
   * @private
   * @returns {undefined}
   */
  _formErrorHandler(xhttp) {
    console.log(xhttp);

    // TODO add offline response
    this._contactFormMessageContainer.innerText = 'Something went wrong, please try again later.';
  }

  /**
   * Submit event handler.
   * @param {Object} event - Submit event
   * @private
   * @returns {undefined}
   */
  _formSubmitHandler(event) {
    event.preventDefault();

    if (this.isFormValid(this._contactForm)) {
      this._sendMailWithFormspree();
    }
  }

}

export default ContactForm;
