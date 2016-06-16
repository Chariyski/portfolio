const progressBarsAnimation = {

  /**
   * Initialize progress bars animation.
   * @returns {undefined}
   */
  init() {
    if (!window.IntersectionObserver) {
      return;
    }

    const progressBars = [...document.querySelectorAll('.c-progress__bar')];

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
    progressBar.style.width = 0;
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
  _animateProgressBar(progressBar, timestamp) {
    const deltaTime = (performance.now() - timestamp) / 1000;
    const maxProgressBarValue = progressBar.getAttribute('data-animate-to');
    const currentProgressBarValue = parseInt(progressBar.getAttribute('data-progress'), 10);
    const increasedValue = `${currentProgressBarValue + 1 + deltaTime}%`;

    progressBar.setAttribute('data-progress', parseInt(increasedValue, 10));
    progressBar.style.width = increasedValue;

    if (parseInt(progressBar.style.width, 10) === parseInt(maxProgressBarValue, 10)) {
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
    const resumeBoxIcons = [...document.querySelectorAll('.c-resume-box__icon')];

    if (!window.IntersectionObserver) {
      resumeBoxIcons.forEach((resumeBoxIcon) => resumeBoxIcon.classList.add('c-resume-box__icon--is-animated'));
      return;
    }

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
      change.target.classList.add('c-resume-box__icon--is-animated');

      this._observer.unobserve(change.target);
    });
  }
};

export default {
  initProgressBarsAnimation: progressBarsAnimation.init.bind(progressBarsAnimation),
  initResumeBoxesAnimation: resumeBoxesAnimation.init.bind(resumeBoxesAnimation)
};
