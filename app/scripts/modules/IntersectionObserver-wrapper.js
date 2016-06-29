/**
 * @typedef {Object} IntersectionObserverOptions
 * @property {string} querySelector - Valid selector for querySelectorAll.
 * @property {Array} threshold - Threshold(s) at which to trigger callback, specified as a ratio, or list of ratios.
 * @property {string} rootMargin - Same as margin, can be 1, 2, 3 or 4 components, possibly negative lengths.
 */

/**
 * IntersectionObserver wrapper for convenient.
 */
class IntersectionObserverWrapper {

  /**
   * @param {function} callback - Callback function called whenever one target, intersects either the device viewport.
   * @param {IntersectionObserverOptions} options - All the needed options for IntersectionObserver.
   * @constructor
   */
  constructor(callback, options) {
    const observableElements = Array.prototype.slice.call(document.querySelectorAll(options.querySelector));

    this._callback = callback;
    this._observer = new IntersectionObserver(this._handler.bind(this), {
      threshold: options.threshold || [0],
      rootMargin: options.rootMargin || '-50px 0px'
    });

    observableElements.forEach((observableElement) => this._observer.observe(observableElement));
  }

  /**
   * Get reference to the IntersectionObserver.
   * @returns {IntersectionObserver}
   */
  getObserver() {
    return this._observer;
  }

  /**
   * IntersectionObserver handler.
   * @param {Array} changes - Array with changes in the intersection of a target element with an ancestor element.
   * @param {Object} observer - native IntersectionObserver object.
   * @private
   * @returns {undefined}
   */
  _handler(changes, observer) {
    const that = this;

    this._callback(changes, observer);

    changes.forEach((change) => {
      if (observer) {
        observer.unobserve(change.target);
      } else { // Currently the polyfill doesn't return a reference to the observer
        that._observer.unobserve(change.target);
      }
    });
  }
}

export default IntersectionObserverWrapper;
