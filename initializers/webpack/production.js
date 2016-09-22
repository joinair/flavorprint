
import path from 'path';
import webpack from 'webpack';

import ExtractTextPlugin from 'extract-text-webpack-plugin';

import common from './common';
import config from '../config';

common.module.loaders.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style-loader', [
    `css-loader?root=${config.ASSETS_PUBLIC_PATH.substr(1)}&-autoprefixer`,
    'csscomb-loader',
    'postcss-loader',
  ]),
  include: [common.root, common.entryDir],
});

export default {
  devtool: 'source-map',

  manifestFile: path.join(process.cwd(), config.ASSETS_PATH, config.MANIFEST_FILE),

  postcss: common.postcss,

  entry: {
    vendor: common.entry.vendor.concat('mixpanel-browser'),
    bundle: common.entry.bundle,
  },

  output: {
    path: path.join(process.cwd(), config.ASSETS_PATH),
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `${config.ASSETS_PUBLIC_PATH}/`,
  },

  plugins: [
    new ExtractTextPlugin('style-[contenthash].css', { allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-[chunkhash].js'),
    new webpack.optimize.CommonsChunkPlugin({ name: 'meta', chunks: ['vendor'] }),
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      compress: { warnings: false },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'global.Platform.OS': "'browser'",
      'global.__DEVTOOLS__': false,
      'global.__BUILD_NUMBER__': process.env.CIRCLE_BUILD_NUM,
      'process.env.NODE_ENV': "'production'",
    }),
  ],

  resolve: common.resolve,

  module: common.module,
};
