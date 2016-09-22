
import { connect } from 'react-redux';

import { URL_SHARING } from 'constants/AnalyticsEventTypes';

import facebook from 'helpers/facebook';
import google from 'helpers/google';
import pinterest from 'helpers/pinterest';
import twitter from 'helpers/twitter';

import SharingIcons from './SharingIcons';

const services = {
  facebook,
  google,
  pinterest,
  twitter,
};

const actions = dispatch => ({
  onShare: (service, url, config) => {
    dispatch({ type: URL_SHARING, payload: { service } });
    services[service].share(url, config);
  },
});

export default connect(null, actions)(SharingIcons);
