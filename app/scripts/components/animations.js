const progressBarsAnimation = {

  /**
   * Initialize progress bars animation.
   * @returns {undefined}
   */
  init() {
    const progressBars = Array.prototype.slice.call(document.querySelectorAll('.c-progress__bar'));

    progressBars.forEach(this._prepareProgressBarsForAnimations);

    this._observer = new IntersectionObserver(this._intersectionObserverHandler.bind(this), {
      threshold: [0],
      rootMargin: '-50px 0px'
    });

    progressBars.forEach((progressBar) => this._observer.observe(progressBar));
  },

  /**
   * Set the progress bar to zero, so that they can be animated.
   * TODO if the polyfill works this is unneeded and need to be transfer to CSS
   * @param {Element} progressBar - Progress bar DOM element.
   * @private
   * @returns {undefined}
   */
  _prepareProgressBarsForAnimations(progressBar) {
    progressBar.setAttribute('data-progress', 0);
  },

  /**
   * Intersection observer handler.
   * @param {Array} changes - Array with changes in the intersection of a target element with an ancestor element.
   * @private
   * @returns {undefined}
   */
  _intersectionObserverHandler(changes) {
    changes.forEach((change) => {
      requestAnimationFrame(this._animateProgressBar.bind(this._animateProgressBar, change.target));

      this._observer.unobserve(change.target);
    });
  },

  /**
   * Animate progress bar value.
   * @param {Element} progressBar - Progress bar DOM element.
   * @param {number} timestamp - timestamp from requestAnimationFrame.
   * @private
   * @returns {undefined}
   */
  _animateProgressBar(progressBar) {
    const step = 2;
    const defaultTransitionValue = 100;
    const maxProgressBarValue = parseInt(progressBar.getAttribute('data-animate-to'), 10);
    const currentProgressBarValue = parseInt(progressBar.getAttribute('data-progress'), 10);
    const increasedValue = currentProgressBarValue + step;
    const nextProgressBarValue = increasedValue <= maxProgressBarValue ? increasedValue : maxProgressBarValue;

    progressBar.setAttribute('data-progress', `${nextProgressBarValue}%`);

    // TODO remove webkitTransform in future
    progressBar.style.webkitTransform = `translateX(${nextProgressBarValue - defaultTransitionValue}%)`;
    progressBar.style.transform = `translateX(${nextProgressBarValue - defaultTransitionValue}%)`;

    if (increasedValue >= maxProgressBarValue) {
      cancelAnimationFrame(this._animateProgressBar);
    } else {
      requestAnimationFrame(this.bind(this, progressBar));
    }
  }
};

const resumeBoxesAnimation = {

  /**
   * Initialize resume boxes animation.
   * @returns {undefined}
   */
  init() {
    const resumeBoxIcons = Array.prototype.slice.call(document.querySelectorAll('.c-resume-box__icon'));

    this._observer = new IntersectionObserver(this._intersectionObserverHandler.bind(this), {
      threshold: [0],
      rootMargin: '-50px 0px'
    });

    resumeBoxIcons.forEach((resumeBoxIcon) => this._observer.observe(resumeBoxIcon));
  },

  /**
   * Intersection observer handler.
   * @param {Array} changes - Array with changes in the intersection of a target element with an ancestor element.
   * @private
   * @returns {undefined}
   */
  _intersectionObserverHandler(changes) {
    changes.forEach((change) => {
      const progressBar = change.target;

      // ClassList and ClassName are not working in IE11 when duplicating a svg with <use>
      progressBar.setAttribute('class', `${progressBar.getAttribute('class')} c-resume-box__icon--is-animated`);

      this._observer.unobserve(progressBar);
    });
  }
};

export default {
  initProgressBarsAnimation: progressBarsAnimation.init.bind(progressBarsAnimation),
  initResumeBoxesAnimation: resumeBoxesAnimation.init.bind(resumeBoxesAnimation)
};
