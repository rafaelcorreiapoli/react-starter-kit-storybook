// const path = require('path');
//
// const DEBUG = !process.argv.includes('--release');
// const AUTOPREFIXER_BROWSERS = [
//   'Android 2.3',
//   'Android >= 4',
//   'Chrome >= 35',
//   'Firefox >= 31',
//   'Explorer >= 9',
//   'iOS >= 7',
//   'Opera >= 12',
//   'Safari >= 7.1',
// ];
//
// module.exports = {
//   module: {
//     loaders: [
//       {
//         test: /\.css?$/,
//         loaders: [
//           'isomorphic-style-loader',
//           `css-loader?${JSON.stringify({
//             sourceMap: DEBUG,
//             // CSS Modules https://github.com/css-modules/css-modules
//             modules: true,
//             localIdentName: DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
//             // CSS Nano http://cssnano.co/options/
//             minimize: !DEBUG,
//           })}`,
//           'postcss-loader?pack=default',
//         ],
//         include: path.resolve(__dirname, '../')
//       },
//     ],
//   },
//   postcss(bundler) {
//     return {
//       default: [
//         // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
//         // https://github.com/postcss/postcss-import
//         require('postcss-import')({ addDependencyTo: bundler }),
//         // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
//         // https://github.com/postcss/postcss-custom-properties
//         require('postcss-custom-properties')(),
//         // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
//         // https://github.com/postcss/postcss-custom-media
//         require('postcss-custom-media')(),
//         // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
//         // https://github.com/postcss/postcss-media-minmax
//         require('postcss-media-minmax')(),
//         // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
//         // https://github.com/postcss/postcss-custom-selectors
//         require('postcss-custom-selectors')(),
//         // W3C calc() function, e.g. div { height: calc(100px - 2em); }
//         // https://github.com/postcss/postcss-calc
//         require('postcss-calc')(),
//         // Allows you to nest one style rule inside another
//         // https://github.com/jonathantneal/postcss-nesting
//         require('postcss-nesting')(),
//         // W3C color() function, e.g. div { background: color(red alpha(90%)); }
//         // https://github.com/postcss/postcss-color-function
//         require('postcss-color-function')(),
//         // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
//         // https://github.com/iamvdo/pleeease-filters
//         require('pleeease-filters')(),
//         // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
//         // https://github.com/robwierzbowski/node-pixrem
//         require('pixrem')(),
//         // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
//         // https://github.com/postcss/postcss-selector-matches
//         require('postcss-selector-matches')(),
//         // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
//         // https://github.com/postcss/postcss-selector-not
//         require('postcss-selector-not')(),
//         // Add vendor prefixes to CSS rules using values from caniuse.com
//         // https://github.com/postcss/autoprefixer
//         require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
//       ],
//       sass: [
//         require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
//       ],
//     };
//   },
// }


/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const path = require('path');
const webpack = require('webpack');
const extend = require('extend');
const AssetsPlugin = require('assets-webpack-plugin');
// import path from 'path';
// import webpack from 'webpack';
// import extend from 'extend';
// import AssetsPlugin from 'assets-webpack-plugin';

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
};

//
// Common configuration chunk to be used for both
// client-side (client.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const config = {
  context: path.resolve(__dirname, '../src'),

  output: {
    path: path.resolve(__dirname, '../build/public/assets'),
    publicPath: '/assets/',
    sourcePrefix: '  ',
  },

  module: {
    loaders: [
      {
        test: /\.css/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: DEBUG,
            // CSS Modules https://github.com/css-modules/css-modules
            modules: true,
            localIdentName: DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
            // CSS Nano http://cssnano.co/options/
            minimize: !DEBUG,
          })}`,
          'postcss-loader?pack=default',
        ],
      },
    ],
  },

  resolve: {
    root: path.resolve(__dirname, '../src'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  postcss(bundler) {
    return {
      default: [
        // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
        // https://github.com/postcss/postcss-import
        require('postcss-import')({ addDependencyTo: bundler }),
        // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
        // https://github.com/postcss/postcss-custom-properties
        require('postcss-custom-properties')(),
        // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
        // https://github.com/postcss/postcss-custom-media
        require('postcss-custom-media')(),
        // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
        // https://github.com/postcss/postcss-media-minmax
        require('postcss-media-minmax')(),
        // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
        // https://github.com/postcss/postcss-custom-selectors
        require('postcss-custom-selectors')(),
        // W3C calc() function, e.g. div { height: calc(100px - 2em); }
        // https://github.com/postcss/postcss-calc
        require('postcss-calc')(),
        // Allows you to nest one style rule inside another
        // https://github.com/jonathantneal/postcss-nesting
        require('postcss-nesting')(),
        // W3C color() function, e.g. div { background: color(red alpha(90%)); }
        // https://github.com/postcss/postcss-color-function
        require('postcss-color-function')(),
        // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
        // https://github.com/iamvdo/pleeease-filters
        require('pleeease-filters')(),
        // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
        // https://github.com/robwierzbowski/node-pixrem
        require('pixrem')(),
        // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
        // https://github.com/postcss/postcss-selector-matches
        require('postcss-selector-matches')(),
        // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
        // https://github.com/postcss/postcss-selector-not
        require('postcss-selector-not')(),
        // Add vendor prefixes to CSS rules using values from caniuse.com
        // https://github.com/postcss/autoprefixer
        require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
      ],
      sass: [
        require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
      ],
    };
  },
};

//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

const clientConfig = extend(true, {}, config, {
  entry: './client.js',

  output: {
    filename: DEBUG ? '[name].js?[chunkhash]' : '[name].[chunkhash].js',
    chunkFilename: DEBUG ? '[name].[id].js?[chunkhash]' : '[name].[id].[chunkhash].js',
  },

  target: 'web',

  plugins: [

    // Define free variables
    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': GLOBALS['process.env.NODE_ENV'],
      __DEV__: DEBUG,
      'process.env.BROWSER': true
    }),

    // Emit a file with assets paths
    // https://github.com/sporto/assets-webpack-plugin#options
    new AssetsPlugin({
      path: path.resolve(__dirname, '../build'),
      filename: 'assets.js',
      processOutput: x => `module.exports = ${JSON.stringify(x)};`,
    }),

    // Assign the module and chunk ids by occurrence count
    // Consistent ordering of modules required if using any hashing ([hash] or [chunkhash])
    // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    new webpack.optimize.OccurrenceOrderPlugin(true),

    ...DEBUG ? [] : [

      // Search for equal or similar files and deduplicate them in the output
      // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      new webpack.optimize.DedupePlugin(),

      // Minimize all JavaScript output of chunks
      // https://github.com/mishoo/UglifyJS2#compressor-options
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
          warnings: VERBOSE,
        },
      }),

      // A plugin for a more aggressive chunk merging strategy
      // https://webpack.github.io/docs/list-of-plugins.html#aggressivemergingplugin
      new webpack.optimize.AggressiveMergingPlugin(),
    ],
  ],

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
});

module.exports = clientConfig;
