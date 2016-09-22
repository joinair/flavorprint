
import path from 'path';

import autoprefixer from 'autoprefixer';
import postcssBEM from 'postcss-bem';
import postcssCustomProperties from 'postcss-custom-properties';
import postcssImport from 'postcss-import';
import postcssMixins from 'postcss-mixins';
import postcssNested from 'postcss-nested';
import postcssCustomMedia from 'postcss-custom-media';
import postcssDiscardComments from 'postcss-discard-comments';
import postcssEach from 'postcss-each';
import postcssSimpleVars from 'postcss-simple-vars';

const root = path.join(process.cwd(), 'src');
const entry = path.join(process.cwd(), 'initializers/client');

export default {
  root,
  entryDir: entry,

  entry: {
    bundle: entry,
    vendor: [
      'babel-polyfill',
      'classnames',
      'ismobilejs',
      'js-cookie',
      'qs',
      'react',
      'react-dom',
      'react-helmet',
      'react-redux',
      'react-router',
      'redux',
      'redux-saga',
      'react-side-effect',
      'redux-thunk',
      'reselect',
      'rx',
      'superagent',
      'transducers.js',
      'uuid',
    ],
  },

  postcss: webpack => [
    postcssImport({ addDependencyTo: webpack, path: root }),
    postcssEach,
    postcssCustomProperties,
    postcssMixins,
    postcssSimpleVars,
    postcssBEM,
    postcssNested,
    postcssCustomMedia,
    postcssDiscardComments,
    autoprefixer({ browsers: ['last 2 versions', 'Chrome > 21'] }),
  ],

  resolve: {
    root,
    extensions: ['', '.js', '.jsx'],
    alias: {
      rx$: 'rx/dist/rx.lite',
    },
  },

  module: {
    loaders: [
      {
        test: /\.(eot|jpg|jpeg|png|ttf|woff|woff2)$/,
        loader: 'url',
        query: { limit: 10000, name: '[name]-[hash].[ext]' },
      },
      {
        test: new RegExp(
          'masonry|imagesloaded|fizzy-ui-utils|' +
          'desandro-|outlayer|get-size|doc-ready|eventie|eventemitter'
        ),
        loader: 'imports?define=>false&this=>window',
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        include: [root, entry],
        query: {
          babelrc: false,
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread'],
          env: {
            development: {
              plugins: [
                ['react-transform', {
                  transforms: [
                    {
                      transform: 'react-transform-hmr',
                      imports: ['react'],
                      locals: ['module'],
                    }, {
                      transform: 'react-transform-catch-errors',
                      imports: ['react', 'redbox-react'],
                    },
                  ],
                }],
              ],
            },

            production: {
              plugins: [
                'transform-react-constant-elements',
                'transform-react-inline-elements',
              ],
            },
          },
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite',
        query: { name: '[path][name].[ext]' },
      },
    ],
  },
};
