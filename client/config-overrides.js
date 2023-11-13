const { override, babelInclude } = require('customize-cra');
const path = require('path');

module.exports = override(
  // Include the Mapbox GL package for Babel transpilation
  babelInclude([
    path.resolve('src'), // make sure you link your own source
    path.resolve('node_modules/mapbox-gl'), // link the mapbox-gl module
  ])
);
