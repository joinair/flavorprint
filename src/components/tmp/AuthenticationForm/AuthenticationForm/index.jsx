
import React, { Component, PropTypes } from 'react';

import assign from 'lodash/assign';
import bind from 'lodash/bind';
import classnames from 'classnames';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import reduce from 'lodash/reduce';
import set from 'lodash/set';

import getCustomErrorDescription from 'helpers/getCustomErrorDescription';

import '../styles.css';

import { Tab, Tabs, TabList, TabPanel } from 'components/ui-elements/Tabs';
import SignUpForm from '../SignUpForm';
import LogInForm from '../LogInForm';

const LOG_IN_TAB = 'Log in';
const SIGN_UP_TAB = 'Sign up';

class AuthenticationForm extends Component {
  constructor(props) {
    super(props);

    this.handleLogIn = bind(this.handleLogIn, this);
    this.handleSignUp = bind(this.handleSignUp, this);
    this.handleFieldChange = bind(this.handleFieldChange, this);

    this.state = {
      errors: {},
      fields: {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedTab !== nextProps.selectedTab) {
      this.setState({ errors: {} });
    }
  }

  handleSignUp() {
    const onError = ({ code, fields }) => {
      let errors;

      if (code === 'auth.accountAlreadyExists') {
        errors = { email: 'Email address is already in use. Did you mean to log in?' };
      } else {
        errors = reduce(
          fields,
          (acc, error, path) =>
            set(acc, path, getCustomErrorDescription('signUp', path, error)),
          {}
        );
      }

      this.setState({ errors });
    };

    this.props.onSignUp(this.state.fields).subscribe(noop, onError);
  }

  handleLogIn() {
    const { onLogIn } = this.props;
    const { email, password } = this.state.fields;

    const onError = ({ code, fields }) => {
      let errors;

      if (code === 'auth.invalidCredentials') {
        errors = { password: 'Invalid password.' };
      } else {
        errors = reduce(
          fields,
          (acc, error, path) =>
            set(acc, path, getCustomErrorDescription('logIn', path, error)),
          {}
        );
      }

      this.setState({ errors });
    };

    onLogIn({ email, password }).subscribe(noop, onError);
  }

  handleFieldChange(key, value) {
    const { errors, fields } = this.state;

    this.setState({
      errors: omit(errors, key),
      fields: assign({}, fields, { [key]: value }),
    });
  }

  render() {
    const {
      context, selectedTab,
      onFacebookLogIn, onForgotPassword, onGoogleLogIn, onTabSelect,
    } = this.props;
    const { errors, fields } = this.state;

    const formClasses = classnames('AuthenticationForm', {
      [`is-in${context}`]: context,
    });

    return (
      <Tabs className={formClasses} onSelect={onTabSelect}>
        <TabList className="AuthenticationForm-tabList">
          <Tab
            className="AuthenticationForm-tab"
            name={SIGN_UP_TAB}
            selected={selectedTab === SIGN_UP_TAB}
          >
            Sign up
          </Tab>
          <Tab
            className="AuthenticationForm-tab"
            name={LOG_IN_TAB}
            selected={selectedTab === LOG_IN_TAB}
          >
            Log in
          </Tab>
        </TabList>

        <TabPanel
          className="AuthenticationForm-tabPanel"
          name={SIGN_UP_TAB}
        >
          <SignUpForm
            errors={errors}
            fields={fields}
            onFacebookSignUp={onFacebookLogIn}
            onFieldChange={this.handleFieldChange}
            onGoogleSignUp={onGoogleLogIn}
            onSignUp={this.handleSignUp}
          />
        </TabPanel>

        <TabPanel
          className="AuthenticationForm-tabPanel"
          name={LOG_IN_TAB}
        >
          <LogInForm
            errors={errors}
            fields={fields}
            onFacebookLogIn={onFacebookLogIn}
            onFieldChange={this.handleFieldChange}
            onForgotPassword={onForgotPassword}
            onGoogleLogIn={onGoogleLogIn}
            onLogIn={this.handleLogIn}
          />
        </TabPanel>
      </Tabs>
    );
  }
}

AuthenticationForm.propTypes = {
  context: PropTypes.string,
  selectedTab: PropTypes.string,
  onFacebookLogIn: PropTypes.func.isRequired,
  onForgotPassword: PropTypes.func.isRequired,
  onGoogleLogIn: PropTypes.func.isRequired,
  onLogIn: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  onTabSelect: PropTypes.func.isRequired,
};

export default AuthenticationForm;
