
import React, { Component, PropTypes } from 'react';

import OnboardingPreface from 'components/blocks/OnboardingPreface';
import AuthForOnboarding from 'components/banners/AuthForOnboarding';
import { CenteredPreloader } from 'components/ui-elements/Preloader';
import Sticky from 'components/ui-elements/Sticky';
import Feed from './Feed';

import './styles.css';

const HEADER_HEIGHT = 58;
const HERO_BACKGROUND = '/assets/images/static-images/whisk-video-poster-v2.1.jpg';

class Home extends Component {
  render() {
    const { isAuthenticated, isFetching } = this.props;

    if (isAuthenticated && isFetching) {
      return <CenteredPreloader />;
    }

    const getScrollHeight = () =>
      this.refs.hero &&
      this.refs.hero.offsetTop + this.refs.hero.offsetHeight - HEADER_HEIGHT;

    return (
      <div className="Home">
        {!isAuthenticated &&
          <div className="Home-hero" ref="hero">
            <div
              className="Home-heroBackground"
              style={{ backgroundImage: `url("${HERO_BACKGROUND}")` }}
            />

            <div className="Home-onboardingPreface">
              <OnboardingPreface />
            </div>
          </div>
        }

        <div className="AppContainer AppContainer-mainSection">
          <Feed />
        </div>

        {!isAuthenticated &&
          <Sticky scrollHeight={getScrollHeight}>
            <AuthForOnboarding />
          </Sticky>
        }
      </div>
    );
  }
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.any,
};

export default Home;
