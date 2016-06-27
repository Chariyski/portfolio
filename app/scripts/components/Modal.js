import * as md from 'markdown';
import ajax from '../module/ajax';

const markdown = md.markdown;
const CLASS = {
  modalIsOpen: 'c-modal--is-open',
  modalIsClose: 'c-modal--is-close'
};

class Modal {

  constructor(elementId, options) {
    if (!elementId) {
      throw new Error('Modal component requires an ID of a DOM node as a first argument');
    }

    if (options) {
      this._autoClickHandlerAttach = options.autoClickHandlerAttach;
    }

    this._DOMref = document.getElementById(elementId);
    this._initializeEventHandlers();
  }

  open(openerElement) {
    const ajaxFile = openerElement.getAttribute('data-modal-ajax');

    if (ajaxFile) {
      ajax.get(ajaxFile).then(this._ajaxSuccess.bind(this), this._ajaxError.bind(this));
    } else {
      this._DOMref.classList.add(CLASS.modalIsOpen);
    }

    return this;
  }

  close() {
    this._DOMref.classList.remove(CLASS.modalIsOpen);
    document.querySelector('html').style.overflow = 'auto';

    return this;
  }

  _initializeEventHandlers() {
    this._DOMref.addEventListener('click', this._clickEventHandlers.bind(this), false);

    if (this._autoClickHandlerAttach) {
      this._openersHandler()
    }
  }

  _clickEventHandlers(event) {
    const target = event.target;

    if (target.getAttribute('data-modal-close') !== null) {
      this.close();
    }
  }

  _openersHandler() {
    const modalDialogOpeners = Array.prototype.slice.call(document.querySelectorAll('[data-modal]'));
    const that = this;

    modalDialogOpeners.forEach(function (element) {
      element.addEventListener('click', function (event) {
        that.open(event.target);
      }, false);
    });
  }

  _ajaxSuccess(response) {
    this._DOMref.querySelector('.c-modal__content').innerHTML = markdown.toHTML(response);

    document.querySelector('html').style.overflow = 'hidden';

    this._DOMref.classList.add(CLASS.modalIsOpen);
  }

  _ajaxError(error) {
    console.error('Failed', error); // TODO
  }
}

export default Modal;
