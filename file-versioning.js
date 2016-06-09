var Version = require('node-version-assets');

var versionInstance = new Version({
  assets: ['build/styles/main.css', 'build/scripts/bundle.js'],
  grepFiles: ['build/index.html']
});

versionInstance.run();
