/* eslint "no-console": 0 */

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

import isArray from 'lodash/isArray';
import forEach from 'lodash/forEach';

import webpackConfig from './production';
import config from '../config';

webpack(webpackConfig, (_error, stats) => {
  const manifest = {};

  const addToManifest = file => {
    const [full, name, extension] = file.match(/(.*)\-.*(\..*)$/);
    manifest[`${name}${extension}`] = full;
  };

  forEach(stats.toJson().assetsByChunkName, files => {
    if (!isArray(files)) {
      addToManifest(files);
    } else {
      forEach(files, addToManifest);
    }
  });

  console.log(stats.toString());

  fs.writeFile(
    path.join(config.ASSETS_PATH, config.MANIFEST_FILE),
    JSON.stringify(manifest)
  );

  exec(
    `cd ${process.cwd()} &&
     mkdir ${config.ASSETS_PATH}/images/ &&
     cp -R ${config.STATIC_ASSETS_PATH}/images/static-images ${config.ASSETS_PATH}/images/ &&
     cp -R ${config.STATIC_ASSETS_PATH}/images/shops ${config.ASSETS_PATH}/images/ &&
     cp -R ${config.STATIC_ASSETS_PATH}/images/print-sl ${config.ASSETS_PATH}/images/`
  );
});
