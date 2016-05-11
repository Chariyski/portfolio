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
    this._initialiseEventHandlers();
  }

  /**
   * Validate field input.
   * @param {element} element - input or textarea DOM element.
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
   * Attach event handlers.
   * @private
   * @returns {undefined}
   */
  _initialiseEventHandlers() {
    this._contactForm.addEventListener('submit', this._onSubmit.bind(this), false);
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
   * Handler for form submit event.
   * @param {Object} event - Submit event
   * @private
   * @returns {undefined}
   */
  _onSubmit(event) {
    event.preventDefault();

    if (this.isFormValid(event.target)) {

      // Ajax call.

    }
  }

}

export default ContactForm;
