var Version = require('node-version-assets');
var criticalCSS = require('critical');
var smushit = require('node-smushit');

var versionInstance = new Version({
  assets: ['build/styles/main.css', 'build/scripts/bundle.js'],
  grepFiles: ['build/index.html']
});

// Inline critical CSS
criticalCSS.generate({
  inline: true,
  base: 'build/',
  src: 'index.html',
  dest: 'build/index.html',
  dimensions: [{
    height: 640,
    width: 360
  }, {
    height: 1080,
    width: 1920
  }],
  minify: true
}).then(function (output) {
  // Create files version
  versionInstance.run();
}).error(function (err) {
  console.log(err);
});

// Image optimization
smushit.smushit('build/images', {recursive: true});
