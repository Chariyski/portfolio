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
    const gotchaInput = this._contactForm.querySelector('[data-contact-form="gotcha"]');
    const url = 'http://script.google.com/macros/s/AKfycbxkfFCpUaanCmpf87xO-o3zjLcRKipW9efPsP18rNo0j_quuqwT/exec';
    const xhttp = new XMLHttpRequest();
    const messageData = {
      subject: this._contactForm.subject.value,
      name: this._contactForm.name.value,
      email: this._contactForm.email.value,
      message: this._contactForm.message.value
    };

    // Prevent spam from bots
    if (gotchaInput.value) {
      return;
    }

    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhttp.addEventListener('load', this._formLoadHandler.bind(this, xhttp), false);
    xhttp.addEventListener('error', this._formErrorHandler.bind(this), false);

    this._beforeSubmitHanler();

    xhttp.send(JSON.stringify(messageData));
  }

  /**
   * Change submit button visualisation before submitting the form.
   * @private
   * @returns {undefined}
   */
  _beforeSubmitHanler() {
    this._contactFormSubmitButton.setAttribute('disabled', true);
    this._contactFormSubmitButton.classList.add('e-button--is-hover');

    this._contactFormSubmitButton.querySelector('span').innerHTML = 'Sending';
    this._contactFormSubmitButton.querySelector('use').setAttribute('xlink:href', '#icon-loading');
  }

  /**
   * Load event handler.
   * @param {object} xhttp - XMLHttpRequest object.
   * @private
   * @returns {undefined}
   */
  _formLoadHandler(xhttp) {
    const response = JSON.parse(xhttp.response);

    if (response.result === 'success') {
      this._contactFormSubmitButton.parentNode.removeChild(this._contactFormSubmitButton);
      this._contactFormMessageContainer.innerText = 'The message was send successful.';
    }
  }

  /**
   * Error event handler.
   * @private
   * @returns {undefined}
   */
  _formErrorHandler() {
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
