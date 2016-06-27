/**
 * Make AJAX get request.
 * @param {string} url - file location.
 * @returns {Promise}
 */
function get(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.open('GET', url);

    request.onload = function () {
      if (request.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    };

    request.onerror = function () {
      reject(Error('Network Error'));
    };

    request.send();
  });
}

export default {
  get
};
