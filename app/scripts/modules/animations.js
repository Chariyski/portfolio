import IntersectionObserverWrapper from './IntersectionObserverWrapper';

/**
 * Animate progress bar value.
 * @param {Element} progressBar - Progress bar DOM element.
 * @private
 * @returns {undefined}
 */
function _animateProgressBar(progressBar) {
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
    cancelAnimationFrame(_animateProgressBar);
  } else {
    requestAnimationFrame(_animateProgressBar.bind(_animateProgressBar, progressBar));
  }
}

/**
 * Handle resume box animations.
 * @param {Array} changes - Array with changes in the intersection of a target element with an ancestor element.
 * @param {Object} observer - native IntersectionObserver object.
 * @private
 * @returns {undefined}
 */
function _resumeBoxIntersectionObserverHandler(changes, observer) {
  changes.forEach((change) => {
    const progressBar = change.target;

    // ClassList and ClassName are not working in IE11 when duplicating a svg with <use>
    progressBar.setAttribute('class', `${progressBar.getAttribute('class')} c-resume-box__icon--is-animated`);

    observer.unobserve(progressBar);
  });
}


/**
 * Handle testimonials animations.
 * @param {Array} changes - Array with changes in the intersection of a target element with an ancestor element.
 * @param {Object} observer - native IntersectionObserver object.
 * @private
 * @returns {undefined}
 */
function _testimonialsIntersectionObserverHandler(changes, observer) {
  changes.forEach((change) => {
    if (navigator.onLine === false) {
      return;
    }

    const targetSRC = change.target.getAttribute('data-src');
    const targetSRCSET = change.target.getAttribute('data-srcset');

    change.target.onload = requestAnimationFrame(() => {
      change.target.classList.remove('c-testimonial__avatar--is-not-loaded');
    });

    if (targetSRCSET) {
      change.target.srcset = targetSRCSET;
    }
    change.target.src = targetSRC;

    observer.unobserve(change.target);
  });
}

export default {
  init() {
    this.progressBarObserver = new IntersectionObserverWrapper((changes, observer) => {
      changes.forEach((change) => {
        requestAnimationFrame(_animateProgressBar.bind(_animateProgressBar, change.target));

        observer.unobserve(change.target);
      });
    }, {
      querySelector: '.c-progress__bar'
    });

    // Resume boxes
    this.resumeBoxesObserver = new IntersectionObserverWrapper(_resumeBoxIntersectionObserverHandler, {
      querySelector: '.c-resume-box__icon'
    });

    // Testimonials
    this.testimonialsObserver = new IntersectionObserverWrapper(_testimonialsIntersectionObserverHandler, {
      querySelector: '[data-lazy-load="image"]',
      rootMargin: '-100px 0px'
    });
  }
};
