/**
 * @typedef {Object} SidebarOptions
 * @property {string} openButtonId - ID of a DOM node for showing the Sidebar
 * @property {string} closeButtonId - ID of a DOM node for hiding the Sidebar
 * @property {string} translate - ID of a DOM node which will be moved in parallel with the Sidebar
 */

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

    this._sidebar = document.getElementById(elementId);
    this._openButton = document.getElementById(options.openButtonId);
    this._closeButton = document.getElementById(options.closeButtonId);
    this._transleContent = document.getElementById(options.translate);

    this._initializeEventHandlers();
  }

  /**
   * Show/Hide the Sidebar.
   * @returns {Sidebar}
   */
  toggle() {
    this._sidebar.classList.toggle('sidebar--open');

    if (this._transleContent) {
      this._transleContent.classList.toggle('sidebar-is-open');
    }

    return this;
  }

  /**
   * @returns {undefined}
   */
  _initializeEventHandlers() {
    this._openButton.addEventListener('click', this.toggle.bind(this), false);
    this._closeButton.addEventListener('click', this.toggle.bind(this), false);
  }

}

export default Sidebar;
