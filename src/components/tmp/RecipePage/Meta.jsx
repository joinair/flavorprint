
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import get from 'lodash/get';
import join from 'lodash/join';
import map from 'lodash/map';

import { domain } from 'constants/Config';
import { logo, logoSize } from 'constants/SharingMeta';

import getSharingPath from './helpers/getSharingPath';

const Meta = ({ recipe }) => {
  const image = get(recipe, 'data.image');
  const imgUrl = get(image, 'url', logo);
  const imgHeight = get(image, 'height', logoSize);
  const imgWigth = get(image, 'width', logoSize);

  const description = recipe.externalUrl
    ? join(map(recipe.data.ingredients, 'text'), ', ')
    : recipe.data.description || join(map(recipe.data.ingredients, 'text'), ', ');

  const title = recipe.data.name || '';

  const cardType = (imgWigth >= imgHeight) && (imgHeight > logoSize)
    ? 'summary_large_image'
    : 'summary';

  const meta = [
    { name: 'description', content: description },
    { property: 'og:description', content: description },
    { property: 'og:image:url', content: imgUrl },
    { property: 'og:image:secure_url', content: imgUrl },
    { property: 'og:image:height', content: imgHeight },
    { property: 'og:image:width', content: imgWigth },
    { property: 'og:title', content: title },
    { property: 'og:url', content: `${domain}${getSharingPath(recipe)}` },
    { property: 'twitter:card', content: cardType },
    { property: 'twitter:description', content: description },
    { property: 'twitter:image', content: imgUrl },
    { property: 'twitter:title', content: title },
  ];

  if (recipe.externalUrl) {
    meta.push({ name: 'robots', content: 'noindex' });
  }

  return (
    <Helmet title={`${title} - Whisk`} meta={meta} />
  );
};

Meta.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
  }),

  recipe: PropTypes.shape({
    externalUrl: PropTypes.string,

    data: PropTypes.shape({
      description: PropTypes.string,
      image: PropTypes.shape({
        height: PropTypes.number,
        url: PropTypes.string,
        width: PropTypes.number,
      }),
      name: PropTypes.string,
      publisher: PropTypes.shape({
        displayName: PropTypes.string,
      }),
    }).isRequired,
  }),
};

export default Meta;
