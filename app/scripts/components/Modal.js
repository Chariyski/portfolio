import * as md from 'markdown';
import ajax from '../modules/ajax';

const markdownToHTML = md.markdown.toHTML;
const modalClassName = {
  opened: 'c-modal--is-open',
  closed: 'c-modal--is-close',
  content: 'c-modal__content',
  loadingIndicator: 'c-modal__loading-indicator'
};

/**
 * Modal dialog.
 */
class Modal {

  /**
   * @param {string} elementId - ID of a DOM node that will be the root element of the Modal.
   * @constructor
   */
  constructor(elementId) {
    const modalDOMref = document.getElementById(elementId);

    if (modalDOMref === null) {
      throw new Error('Modal component requires an ID of a DOM node as a first argument');
    }

    this._DOMref = modalDOMref;
    this._contentDOMref = this._DOMref.querySelector(`.${modalClassName.content}`);
    this._loadingIndicator = `<svg class="${modalClassName.loadingIndicator}">
                                <use xlink:href="#icon-loading"></use>
                              </svg>`;

    this._initializeEventHandlers();
  }

  /**
   * Show the modal.
   * @param {Element} openerElement - The DOM element that triggers the modal opening.
   * @returns {Modal}
   */
  open(openerElement) {
    const ajaxFile = openerElement.getAttribute('data-modal-ajax');

    if (ajaxFile) {
      this._contentDOMref.innerHTML = this._loadingIndicator;
      ajax.get(ajaxFile).then(this._ajaxSuccess.bind(this), this._ajaxError.bind(this));
    }

    document.querySelector('html').style.overflow = 'hidden';
    this._DOMref.classList.add(modalClassName.opened);

    return this;
  }

  /**
   * Hide the modal
   * @returns {Modal}
   */
  close() {
    this._DOMref.classList.remove(modalClassName.opened);
    document.querySelector('html').style.overflow = 'auto';

    this._contentDOMref.innerHTML = '';
    return this;
  }

  /**
   * Initialize event handlers.
   * @private
   * @returns {undefined}
   */
  _initializeEventHandlers() {
    this._DOMref.addEventListener('click', this._clickEventHandlers.bind(this), false);
  }

  /**
   * Click handler.
   * @param {Object} event - click event object.
   * @private
   * @returns {undefined}
   */
  _clickEventHandlers(event) {
    const target = event.target;

    if (target.getAttribute('data-modal-close') !== null) {
      this.close();
    }
  }

  /**
   * Handle AJAX call success.
   * @param {Object} response - AJAX response object
   * @private
   * @returns {undefined}
   */
  _ajaxSuccess(response) {
    this._contentDOMref.innerHTML = markdownToHTML(response);
  }

  /**
   * Handle AJAX call error.
   * @param {Object} error - AJAX response object
   * @private
   * @returns {undefined}
   */
  _ajaxError(error) {
    this._contentDOMref.innerHTML = error.message;
  }
}

export default Modal;
