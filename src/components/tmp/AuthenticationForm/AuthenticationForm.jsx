
import React, { PropTypes } from 'react';

import classnames from 'classnames';

import './styles.css';

import { Tab, Tabs, TabList, TabPanel } from 'components/ui-elements/Tabs';
import SignUpForm from './SignUpForm';
import LogInForm from './LogInForm';

const LOG_IN_TAB = 'Log in';
const SIGN_UP_TAB = 'Sign up';

const AuthenticationForm = props => {
  const {
    context, selectedTab, onTabSelect,
    onFacebookLogIn, onGoogleLogIn,
  } = props;

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
          onFacebookSignUp={onFacebookLogIn}
          onGoogleSignUp={onGoogleLogIn}
        />
      </TabPanel>

      <TabPanel
        className="AuthenticationForm-tabPanel"
        name={LOG_IN_TAB}
      >
        <LogInForm
          onFacebookLogIn={onFacebookLogIn}
          onGoogleLogIn={onGoogleLogIn}
        />
      </TabPanel>
    </Tabs>
  );
};

AuthenticationForm.propTypes = {
  context: PropTypes.string,
  selectedTab: PropTypes.string,
  onFacebookLogIn: PropTypes.func.isRequired,
  onGoogleLogIn: PropTypes.func.isRequired,
  onTabSelect: PropTypes.func.isRequired,
};

export default AuthenticationForm;
