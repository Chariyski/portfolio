import IntersectionObserverWrapper from './IntersectionObserver-wrapper';
import LazyLoad from './lazy-load';

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
    this.testimonialsObserver = new LazyLoad('[data-lazy-load="testimonial-avatar"]', (loadedImage) => {
      loadedImage.classList.remove('c-testimonial__avatar--is-not-loaded');
    });
  }
};
