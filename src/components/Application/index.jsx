/* eslint react/prefer-stateless-function: 0 */

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import { domain } from 'constants/Config';

class Application extends Component {
  render() {
    return (
      <div>
        <Helmet
          title="FlavorPrint"
          meta={[
            { property: 'og:site_name', content: 'FlavorPrint' },
            { property: 'og:title', content: 'FlavorPrint' },
            { property: 'og:url', content: domain },
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
