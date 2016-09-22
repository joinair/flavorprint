
import path from 'path';
import webpack from 'webpack';

import common from './common';
import config from '../config';

common.module.loaders.push({
  test: /\.css$/,
  loaders: [
    'style-loader',
    `css-loader?root=${config.ASSETS_PUBLIC_PATH.substr(1)}`,
    'postcss-loader',
  ],
  include: [common.root, common.entryDir],
});

export default {
  devtool: 'eval',

  postcss: common.postcss,

  entry: {
    vendor: common.entry.vendor.concat([
      'redux-devtools',
      'redux-devtools-dock-monitor',
      'redux-devtools-log-monitor',
    ]),
    bundle: ['webpack-hot-middleware/client', common.entry.bundle],
  },

  output: {
    path: path.join(process.cwd(), 'tmp/webpack'),
    filename: '[name].js',
    chunkFilename: '[id]-[name].js',
    publicPath: `${config.ASSETS_PUBLIC_PATH}/`,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'global.Platform.OS': "'browser'",
      'global.__DEVTOOLS__': true,
      'process.env.NODE_ENV': '"development"',
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.optimize.CommonsChunkPlugin({ name: 'meta', chunks: ['vendor'] }),
  ],

  resolve: common.resolve,

  module: common.module,
};
