import IntersectionObserverWrapper from './IntersectionObserver-wrapper';

/**
 * Lazy load images.
 */
class LazyLoad {

  /**
   * @param {string} querySelector - Valid selector for querySelectorAll.
   * @param {function} callback - callback.
   * @constructor
   */
  constructor(querySelector, callback) {
    const observer = new IntersectionObserverWrapper(this.handleChanges.bind(this), {
      querySelector,
      rootMargin: '100px 0px'
    });

    this._observer = observer.getObserver();
    this.callback = callback;
  }

  /**
   * Handle changes.
   * @param {Array} changes - Array with changes in the intersection of a target element with an ancestor element.
   * @returns {undefined}
   */
  handleChanges(changes) {
    const that = this;

    changes.forEach((change) => {
      if (navigator.onLine === false) {
        return;
      }

      const targetSRC = change.target.getAttribute('data-src');
      const targetSRCSET = change.target.getAttribute('data-srcset');
      const onloadCallback = that.callback;

      change.target.onload = requestAnimationFrame(() => {
        if (onloadCallback) {
          onloadCallback(change.target);
        }
      });

      if (targetSRCSET) {
        change.target.srcset = targetSRCSET;
      }

      change.target.src = targetSRC;
    });
  }
}

export default LazyLoad;
