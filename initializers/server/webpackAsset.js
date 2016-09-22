
import config from '../config';

let webpackAsset;

if (process.env.NODE_ENV === 'development') {
  webpackAsset = (asset, extension) =>
    `${config.ASSETS_PUBLIC_PATH}/${asset}.${extension}`;
} else {
  const fs = require('fs');
  const path = require('path');

  const manifestPath =
    path.join(process.cwd(), config.ASSETS_PATH, config.MANIFEST_FILE);
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  webpackAsset = (asset, extension) =>
    `${config.ASSETS_PUBLIC_PATH}/${manifest[`${asset}.${extension}`]}`;
}

const toExport = webpackAsset;

export default toExport;
