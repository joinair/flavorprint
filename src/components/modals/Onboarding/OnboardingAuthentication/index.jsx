
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';

import OnboardingHeader from 'components/modals/Onboarding/OnboardingHeader';
import AuthenticationForm from 'components/tmp/AuthenticationForm';

class OnboardingAuthentication extends Component {
  constructor(props) {
    super(props);

    this.handleTabSelect = bind(this.handleTabSelect, this);

    this.state = { selectedTab: 'Sign up' };
  }

  handleTabSelect(tab) {
    this.setState({ selectedTab: tab });
  }

  render() {
    const { onClose } = this.props;

    return (
      <div className="Onboarding-modalContainer">
        <OnboardingHeader
          subtitle="We just need to save your profile."
          title="Almost done"
          onClose={onClose}
        />

        <div className="Onboarding-modalBody">
          <div className="Onboarding-modalBody-container">
            <div className="Onboarding-authentication">
              <AuthenticationForm
                context="Onboarding"
                selectedTab={this.state.selectedTab}
                onTabSelect={this.handleTabSelect}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OnboardingAuthentication.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default OnboardingAuthentication;
