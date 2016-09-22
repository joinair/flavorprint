/* eslint react/no-did-mount-set-state:0 */

import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import classnames from 'classnames';

import { getDate, setDate } from 'helpers/onboarding';

import iconClose from 'assets/images/icons/icon-close.svg';
import './styles.css';

import Avatar from 'components/ui-elements/Avatar';
import Button from 'components/ui-elements/Button';
import Icon from 'components/ui-elements/Icon';

const TIME_INTERVAL = global.__APP_ENV__ === 'production'
  ? 1000 * 60 * 60 * 24 * 7
  : 1000 * 60;

const isVisible = ({ uid, isAuthenticated, completePercentage }) => {
  if (!isAuthenticated) return false;

  const lastSeen = getDate(uid);

  if (lastSeen) {
    if (Date.now() - TIME_INTERVAL >= lastSeen) {
      return completePercentage < 100;
    }

    return false;
  }

  return completePercentage < 100;
};

const progressDashArray = (percentage, min, max) => {
  const fullCircle = max - min;

  return (fullCircle / 100 * percentage) + fullCircle;
};

const ProgressBar = ({ children, hasProgress, percentage }) => (
  <div className="CompleteProfileBanner-progressBar">
    <svg
      className="CompleteProfileBanner-progressBar-icon"
      viewBox="0 0 106 106"
    >
      <circle
        className="CompleteProfileBanner-progressBar-background"
        cx="54"
        cy="54"
        r="51"
      />
      {hasProgress &&
        <circle
          className="CompleteProfileBanner-progressBar-value"
          cx="54"
          cy="54"
          r="51"
          strokeDasharray={progressDashArray(percentage, 316, 632)}
        />
      }
    </svg>
    {children}
  </div>
);

class CompleteProfile extends Component {
  constructor(props) {
    super(props);

    this.complete = bind(this.complete, this);
    this.delay = bind(this.delay, this);

    this.state = { isVisible: false };
  }

  componentDidMount() {
    this.onUpdate(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onUpdate(nextProps);
  }

  onUpdate(props) {
    const visible = isVisible(props);

    if (visible !== this.state.isVisible) {
      this.setState({ isVisible: visible });

      if (visible) { props.onVisible(); }
    }
  }

  complete() {
    this.setState({ isVisible: false });
    this.props.onComplete();
  }

  delay() {
    setDate(this.props.uid);
    this.setState({ isVisible: false });
  }

  render() {
    if (!this.state.isVisible) { return null; }

    const hasProgress = this.props.completePercentage > 0;

    const getCompleteArea = desktop => (
      <div
        className={
          classnames(
            'CompleteProfileBanner-complete',
            {
              'CompleteProfileBanner-complete--desktop': desktop,
              'CompleteProfileBanner-complete--hasProgress': hasProgress,
            }
          )
        }
      >
        <ProgressBar
          percentage={this.props.completePercentage}
          hasProgress={hasProgress}
          profile={this.props.profile}
        >
          <Avatar
            className="CompleteProfileBanner-avatar"
            height={88}
            iconClassName="CompleteProfileBanner-avatar-icon"
            url={this.props.profile.avatar}
            width={88}
          />
        </ProgressBar>

        {hasProgress &&
          <div className="CompleteProfileBanner-status">
            <span className="CompleteProfileBanner-status-percentage">
              {this.props.completePercentage}%
            </span>
            <span className="CompleteProfileBanner-status-text">
              complete
            </span>
          </div>
        }
      </div>
    );

    return (
      <div className="CompleteProfileBanner">
        <div className="CompleteProfileBanner-inner">
          <div
            className="CompleteProfileBanner-close"
            onClick={this.delay}
          >
            <div className="CompleteProfileBanner-close-iconContainer">
              <Icon
                className="CompleteProfileBanner-close-icon"
                glyph={iconClose}
              />
            </div>
          </div>

          {getCompleteArea()}

          <div className="CompleteProfileBanner-info">
            <div className="CompleteProfileBanner-title">
              {hasProgress
                ? 'Get better recommendations'
                : 'Get personalized recipe recommendations'
              }
            </div>

            {getCompleteArea(true)}

            <Button onClick={this.complete}>
              {hasProgress
                ? 'Complete your profile'
                : 'Setup your profile'
              }
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  children: PropTypes.node,
  profile: PropTypes.object,
  hasProgress: PropTypes.bool,
  percentage: PropTypes.number,
};

CompleteProfile.propTypes = {
  completePercentage: PropTypes.number,
  isAuthenticated: PropTypes.bool,
  profile: PropTypes.shape({
    avatar: PropTypes.string,
    onboarding: PropTypes.array,
  }),
  uid: PropTypes.string,
  onComplete: PropTypes.func.isRequired,
  onVisible: PropTypes.func.isRequired,
};

export default CompleteProfile;
