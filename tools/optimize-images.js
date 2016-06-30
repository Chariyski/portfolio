const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

/**
 * TODO - The wrapper function is needed due to https://github.com/killanaca/deployment-tools/issues/1
 * Once that is fixed it cant be removed
 */
const imageminWrapper = function (inputPath, outputPath) {
  imagemin([inputPath], outputPath, {
    plugins: [
      imageminMozjpeg({quality: 70}),
      imageminPngquant({quality: '65-80'})
    ]
  }).then(files => {
    console.log(files);
  });
};

module.exports = function () {
  imageminWrapper('app/images/avatars/*.{jpg,png}', 'build/images/avatars');
  imageminWrapper('app/images/footer/*.{jpg,png}', 'build/images/footer');
  imageminWrapper('app/images/header/*.{jpg,png}', 'build/images/header');
  imageminWrapper('app/images/portfolio/findy/*.{jpg,png}', 'build/images/portfolio/findy');
  imageminWrapper('app/images/portfolio/grunt-nexus-downloader/*.{jpg,png}', 'build/images/portfolio/grunt-nexus-downloader');
  imageminWrapper('app/images/portfolio/jira-cards/*.{jpg,png}', 'build/images/portfolio/jira-cards');
  imageminWrapper('app/images/portfolio/openui5/*.{jpg,png}', 'build/images/portfolio/openui5');
  imageminWrapper('app/images/portfolio/sapui-sofia/*.{jpg,png}', 'build/images/portfolio/sapui-sofia');
  imageminWrapper('app/images/portfolio/techtalks/*.{jpg,png}', 'build/images/portfolio/techtalks');
  imageminWrapper('app/images/portfolio/ui5-inspector/*.{jpg,png}', 'build/images/portfolio/ui5-inspector');
};
