/**
 * @typedef {Object} SidebarOptions
 * @property {string} openButtonId - ID of a DOM node for showing the Sidebar
 * @property {string} closeButtonId - ID of a DOM node for hiding the Sidebar
 * @property {string} translate - ID of a DOM node which will be moved in parallel with the Sidebar
 */

const classNameContentWithOpenSidebar = 'l-page--sidebar-is-open';
const sidebarClassName = {
  opened: 'l-sidebar--is-open',
  noTransition: 'l-sidebar--prevent-transition'
};

/**
 * Multi purpose sidebar.
 */
class Sidebar {

  /**
   * @param {string} elementId - ID of a DOM node that will be the root element of the Sidebar.
   * @param {SidebarOptions} options - Options for Sidebar behavior.
   * @constructor
   */
  constructor(elementId, options) {
    if (!elementId || typeof elementId !== 'string') {
      throw new Error('Sidebar component requires an ID of a DOM node as a first argument');
    }

    if (!options || !options.openButtonId || !options.closeButtonId) {
      throw new Error('Sidebar component requires an option object with openButtonId and closeButtonId');
    }

    this._DOMref = document.getElementById(elementId);
    this._openButton = document.getElementById(options.openButtonId);
    this._closeButton = document.getElementById(options.closeButtonId);
    this._transleContent = document.getElementById(options.translate);

    this._initializeEventHandlers();
  }

  /**
   * Hide the Sidebar.
   * @returns {Sidebar}
   */
  close() {
    if (!this._DOMref.classList.contains(sidebarClassName.opened)) {
      return this;
    }

    this._DOMref.classList.remove(sidebarClassName.opened);

    if (this._transleContent) {
      this._transleContent.classList.remove(classNameContentWithOpenSidebar);
    }

    return this;
  }

  /**
   * Show/Hide the Sidebar.
   * @returns {Sidebar}
   */
  toggle() {
    this._DOMref.classList.toggle(sidebarClassName.opened);

    if (this._transleContent) {
      this._transleContent.classList.toggle(classNameContentWithOpenSidebar);
    }

    return this;
  }

  /**
   * Attach event handlers.
   * @private
   * @returns {undefined}
   */
  _initializeEventHandlers() {
    if (this._openButton) {
      this._openButton.addEventListener('click', this.toggle.bind(this), false);
    }

    if (this._closeButton) {
      this._closeButton.addEventListener('click', this.toggle.bind(this), false);
    }

    this._DOMref.addEventListener('click', this._onClick.bind(this), false);

    this._DOMref.addEventListener('touchstart', this._onTouchStart.bind(this), false);
    this._DOMref.addEventListener('touchmove', this._onTouchMove.bind(this), false);
    this._DOMref.addEventListener('touchend', this._onTouchEnd.bind(this), false);
  }

  /**
   * Click handler.
   * @param {Object} event - click event object.
   * @private
   * @returns {undefined}
   */
  _onClick(event) {
    const target = event.target;

    if (target === this._DOMref || target.nodeName === 'A') {
      this.close();
    }
  }

  /**
   * Touch start handler.
   * @param {Object} event - touch event object.
   * @private
   * @returns {undefined}
   */
  _onTouchStart(event) {
    const nodeName = event.target.nodeName;

    if (nodeName === 'INPUT' || nodeName === 'TEXTAREA') {
      return;
    }

    if (!this._DOMref.classList.contains(sidebarClassName.opened)) {
      return;
    }

    this._touchStartX = event.touches[0].pageX;
    this._touchCurrentX = this._touchStartX;
    this._isTouchOnSidebav = true;

    this._DOMref.classList.add(sidebarClassName.noTransition);
    requestAnimationFrame(this._updateTransitionOnTouch.bind(this));
  }

  /**
   * Touch move handler.
   * @param {Object} event - touch event object.
   * @private
   * @returns {undefined}
   */
  _onTouchMove(event) {
    if (!this._isTouchOnSidebav) {
      return;
    }

    this._touchCurrentX = event.touches[0].pageX;
    this._touchDistance = Math.max(0, this._touchCurrentX - this._touchStartX);

    if (this._touchDistance > 0) {
      event.preventDefault();
    }
  }

  /**
   * Touch end handler.
   * @private
   * @returns {undefined}
   */
  _onTouchEnd() {
    if (!this._isTouchOnSidebav) {
      return;
    }

    this._isTouchOnSidebav = false;

    if (this._touchDistance > 100) {
      this.close();
    }

    this._DOMref.classList.remove(sidebarClassName.noTransition);
    this._DOMref.style.transform = '';
    this._touchDistance = null;
  }

  /**
   * Update the position of the sidebar depending on the dragged distance.
   * @private
   * @returns {undefined}
   */
  _updateTransitionOnTouch() {
    if (!this._isTouchOnSidebav) {
      return;
    }

    this._DOMref.style.transform = `translateX(${this._touchDistance}px)`;

    requestAnimationFrame(this._updateTransitionOnTouch.bind(this));
  }
}

export default Sidebar;
