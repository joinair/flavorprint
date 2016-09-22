
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import get from 'lodash/get';
import find from 'lodash/find';
import bind from 'lodash/bind';
import omit from 'lodash/omit';

import { SIGN_UP, LOG_IN } from 'constants/Routes';
import { REDIRECT_PATH } from 'constants/QueryParams';

import './styles.css';

import AuthenticationForm from 'components/tmp/AuthenticationForm';
import BodyClassName from 'components/ui-elements/BodyClassName';
import VideoBanner from 'components/blocks/VideoBanner';

const ROUTES = [
  {
    path: SIGN_UP,
    tab: 'Sign up',
  },
  {
    path: LOG_IN,
    tab: 'Log in',
  },
];

const getTabByPath = path =>
  get(find(ROUTES, { path }), 'tab');

const getPathByTab = tab =>
  get(find(ROUTES, { tab }), 'path');

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = { alternativeMotto: props.isPublishersLanding };
    this.handleTabSelect = bind(this.handleTabSelect, this);
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated } = nextProps;

    if (!isAuthenticated) return undefined;

    const { location: { query }, onAuth } = nextProps;

    if (query && query[REDIRECT_PATH]) {
      onAuth(query[REDIRECT_PATH], omit(query, REDIRECT_PATH));
    } else {
      onAuth('/');
    }
  }

  handleTabSelect(tab) {
    const path = getPathByTab(tab);

    if (!path) return;

    const { location: { query }, onTabSelect } = this.props;

    onTabSelect(path, query);
  }

  render() {
    const { routerPath, isTizenFridge } = this.props;
    const { alternativeMotto } = this.state;

    const title = alternativeMotto
      ? 'Your smarter cookbook'
      : 'All the food you love';

    const motto = alternativeMotto
      ? (
        <div className="AuthenticationPage-description">
          The best place to organize recipes.
        </div>
      ) : (
        <div className="AuthenticationPage-description">
          Save any recipe in the world to your smart,
          <br className="AuthenticationPage-lineDivider" /> personalized
          Whisk cookbook.
        </div>
      );

    return (
      <BodyClassName
        className="Body--whiteBackground Body--AuthPage Page--hiddenFooter"
      >
        <div className="AuthenticationPage">
          {!isTizenFridge &&
            <div className="AuthenticationPage-videoBannerContainer">
              <VideoBanner className="AuthenticationPage-videoBanner" />
            </div>
          }

          <div className="AuthenticationPage-header">
            <div className="AuthenticationPage-title">{title}</div>
            {motto}
          </div>

          <Helmet title={getTabByPath(routerPath)} />

          <div className="AuthenticationPage-formContainer">
            <AuthenticationForm
              context="AuthenticationFlow"
              selectedTab={getTabByPath(routerPath)}
              onTabSelect={this.handleTabSelect}
            />
          </div>
        </div>
      </BodyClassName>
    );
  }
}

Authentication.propTypes = {
  isAuthenticated: PropTypes.bool,
  isPublishersLanding: PropTypes.bool,
  isTizenFridge: PropTypes.bool,
  location: PropTypes.object.isRequired,
  routerPath: PropTypes.string,
  onAuth: PropTypes.func.isRequired,
  onTabSelect: PropTypes.func.isRequired,
};

export default Authentication;
