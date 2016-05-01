module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: 'chariyski/configurations/es6-browser',
  rules: {
    'no-debugger': 0,
    'no-new': 0,
    'valid-jsdoc': [2, {
      requireReturnDescription: false
    }]
  }

};
