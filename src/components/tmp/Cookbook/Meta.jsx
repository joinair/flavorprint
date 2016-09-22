
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import get from 'lodash/get';

import { domain } from 'constants/Config';
import { logo, logoSize } from 'constants/SharingMeta';

import { avatarURL } from 'helpers/user';

const Meta = ({ profile }) => {
  if (!profile || !profile.username) { return null; }

  const imgUrl = get(avatarURL(profile.avatar, logoSize, logoSize), 'src', logo);

  const description = profile.description || '';
  const title = `${profile.firstName}'s cookbook`;

  return (
    <Helmet
      title={`${title} - Whisk`}
      meta={[
        { name: 'description', content: description },
        { property: 'og:description', content: description },
        { property: 'og:image:url', content: imgUrl },
        { property: 'og:image:secure_url', content: imgUrl },
        { property: 'og:image:height', content: logoSize },
        { property: 'og:image:width', content: logoSize },
        { property: 'og:title', content: title },
        { property: 'og:url', content: `${domain}/${profile.username}` },
        { property: 'twitter:card', content: 'summary' },
        {
          property: 'twitter:description',
          content: description || 'Saved recipes on Whisk.com',
        },
        { property: 'twitter:image', content: imgUrl },
        { property: 'twitter:title', content: title },
      ]}
    />
  );
};

Meta.propTypes = {
  profile: PropTypes.shape({
    avatar: PropTypes.string,
    description: PropTypes.string,
    firstName: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
};

export default Meta;
