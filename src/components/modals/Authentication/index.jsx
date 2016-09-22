
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';

import './styles.css';

import AuthenticationForm from 'components/tmp/AuthenticationForm';
import ModalHeader from 'components/tmp/Modal/ModalHeader';

class Authentication extends Component {
  constructor(props) {
    super(props);

    this.handleTabSelect = bind(this.handleTabSelect, this);
    this.state = { selectedTab: props.selectedTab };
  }

  handleTabSelect(tab) {
    this.setState({ selectedTab: tab });
  }

  render() {
    return (
      <div className="AuthenticationModal">
        <ModalHeader
          mobile
          title="Welcome"
          onHide={this.props.onClose}
        />

        <AuthenticationForm
          context="AuthenticationFlow"
          selectedTab={this.state.selectedTab}
          onTabSelect={this.handleTabSelect}
        />
      </div>
    );
  }
}

Authentication.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Authentication;
