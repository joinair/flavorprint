
import React, { PropTypes } from 'react';

import classnames from 'classnames';
import times from 'lodash/times';

import './styles.css';

const OnboardingNavigation = ({ step, stepsCount }) => (
  <div className="OnboardingNavigation">
    <div className="OnboardingNavigation-list">
      {times(stepsCount, n =>
        <div
          className={
            classnames('OnboardingNavigation-item', { 'is-active': n === step })
          }
          key={n}
        >
          <div className="OnboardingNavigation-item-dot" />
        </div>
      )}
    </div>
  </div>
);

OnboardingNavigation.propTypes = {
  step: PropTypes.number.isRequired,
  stepsCount: PropTypes.number.isRequired,
};

export default OnboardingNavigation;
