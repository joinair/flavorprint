
import React, { Component, PropTypes } from 'react';

import { CenteredPreloader } from 'components/ui-elements/Preloader';

import get from 'lodash/get';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import qs from 'qs';

import config from 'constants/Config';
import { AUTH_DATA } from 'constants/CookiesKeys';

import { REDIRECT_PATH, REDIRECT_TO_MOBILE } from
  'constants/QueryParams';

class OAuthCallback extends Component {
  componentWillMount() {
    if (global.Platform.OS === 'browser') {
      const { location: { query } } = this.props;
      const redirectToMobile = query[REDIRECT_TO_MOBILE];

      if (redirectToMobile) {
        window.location = `${config.mobileProtocol.oauth}://oauth?${qs.stringify(query)}`;
      } else {
        const cookies = require('helpers/cookies').default;
        cookies.set(AUTH_DATA, JSON.stringify(query));
        window.close();

        setTimeout(() => {
          if (!window.closed) {
            const redirectQuery = qs.parse(decodeURIComponent(query.state));
            const pathname = get(redirectQuery, REDIRECT_PATH, '/');
            const search = qs.stringify(omit(redirectQuery, REDIRECT_PATH));

            const onComplete = () => {
              window.location = `${pathname}?${search}`;
            };

            this.props.onSuccess(query, this.props.service)
              .subscribe(noop, onComplete, onComplete);
          }
        }, 1500);
      }
    }
  }

  render() {
    return <CenteredPreloader />;
  }
}

OAuthCallback.propTypes = {
  location: PropTypes.object.isRequired,
  service: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
};

export default OAuthCallback;
