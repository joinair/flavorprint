/* eslint react/prefer-stateless-function: 0 */

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import { domain, facebook } from 'constants/Config';
import { logo, logoSize, motto, siteName } from 'constants/SharingMeta';

class Application extends Component {
  render() {
    return (
      <div>
        <Helmet
          title="Whisk - Recipe recommendations, smart Cookbook, and Shopping list"
          meta={[
            {
              name: 'description',
              content: 'Whisk delivers personal recipe recommendations based' +
                ' upon your unique tastes. Save recipes in your own cookbook' +
                ' and create a shopping list from any recipe.',
            },
            { property: 'fb:app_id', content: facebook.id },
            { property: 'og:description', content: motto },
            { property: 'og:image:url', content: logo },
            { property: 'og:image:secure_url', content: logo },
            { property: 'og:image:height', content: logoSize },
            { property: 'og:image:width', content: logoSize },
            { property: 'og:site_name', content: siteName },
            { property: 'og:title', content: siteName },
            { property: 'og:url', content: domain },
            { property: 'twitter:card', content: 'summary' },
            { property: 'twitter:description', content: motto },
            { property: 'twitter:image', content: logo },
            { property: 'twitter:site', content: '@WhiskTeam' },
            { property: 'twitter:title', content: siteName },
          ]}
        />

        {this.props.children}
      </div>
    );
  }
}

Application.propTypes = {
  children: PropTypes.element,
};

export default Application;
