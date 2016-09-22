
import React, { Component, PropTypes } from 'react';

import assign from 'lodash/assign';
import bind from 'lodash/bind';
import classnames from 'classnames';
import concat from 'lodash/concat';
import get from 'lodash/get';
import includes from 'lodash/includes';
import indexOf from 'lodash/indexOf';
import last from 'lodash/last';
import partial from 'lodash/partial';
import size from 'lodash/size';

import { isRecipeStep } from 'helpers/onboarding';

import {
  COMBINED_AVOIDANCES,
  AUTHENTICATION,
  WELCOME,
} from 'constants/Onboarding';

import './styles.css';

import Preloader from 'components/ui-elements/Preloader';

import OnboardingNavigation from './OnboardingNavigation';
import OnboardingCombinedAvoidances from './CombinedAvoidances';
import OnboardingRecipes from './Recipes';
import OnboardingAuthentication from './OnboardingAuthentication';
import OnboardingWelcome from './OnboardingWelcome';

const components = {
  [COMBINED_AVOIDANCES]: OnboardingCombinedAvoidances,
  [AUTHENTICATION]: OnboardingAuthentication,
  [WELCOME]: OnboardingWelcome,
  recipe: OnboardingRecipes,
};

const getNextStep = (step, steps, isAuthenticated) => {
  if (step === last(steps)) {
    return isAuthenticated ? WELCOME : AUTHENTICATION;
  }

  return get(steps, indexOf(steps, step) + 1);
};

class Onboarding extends Component {
  constructor(props) {
    super(props);

    this.handleContinue = bind(this.handleContinue, this);
    this.handleSkip = bind(this.handleSkip, this);
    this.showStep = bind(this.showStep, this);
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated, profile, onQuizSubmit } = this.props;

    if (nextProps.isAuthenticated &&
        nextProps.isAuthenticated !== isAuthenticated) {
      onQuizSubmit(profile);
    }
  }

  showStep() {
    const {
      preferences, profile, step, steps,
      onClose, onGoBack, onWelcomeClose,
    } = this.props;

    const StepComponent = isRecipeStep(step)
      ? components.recipe
      : components[step];

    if (StepComponent) {
      return (
        <StepComponent
          cancelable={indexOf(steps, step) === 0}
          fields={profile}
          key={step}
          preferences={preferences}
          profile={profile}
          step={step}
          synced={includes(profile.onboarding, step)}
          onBack={onGoBack}
          onCancel={onClose}
          onClose={step === WELCOME ? onWelcomeClose : onClose}
          onContinue={partial(this.handleContinue, step)}
          onSkip={partial(this.handleSkip, step)}
        />
      );
    }

    return false;
  }

  handleContinue(step, data) {
    const { isAuthenticated, profile, steps, onContinue } = this.props;

    const onboarding = profile.onboarding || [];
    const nextStep = getNextStep(step, steps, isAuthenticated);
    const nextData = includes(onboarding, step)
      ? data
      : assign({ onboarding: concat(onboarding, step) }, data);

    onContinue(nextStep, nextData);
  }

  handleSkip(step) {
    const { isAuthenticated, steps, onSkip } = this.props;
    const nextStep = getNextStep(step, steps, isAuthenticated);

    onSkip(nextStep);
  }

  render() {
    const { isFetched, steps, step } = this.props;

    const hasNavigation = isFetched && includes(steps, step);

    const onboardingClasses = classnames(
      'Onboarding',
      {
        'Onboarding--withoutNavigation': !hasNavigation,
        'is-loading': !isFetched,
      }
    );

    return (
      <div className={onboardingClasses}>
        <div className="Onboarding-modal">
          {isFetched ? this.showStep() : <Preloader />}
        </div>

        {hasNavigation &&
          <OnboardingNavigation
            step={indexOf(steps, step)}
            stepsCount={size(steps)}
          />
        }
      </div>
    );
  }
}

Onboarding.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isFetched: PropTypes.bool.isRequired,
  preferences: PropTypes.shape({
    allergies: PropTypes.array,
    diets: PropTypes.array,
    dislikedProducts: PropTypes.array,
    inventories: PropTypes.array,
  }),
  profile: PropTypes.shape({
    allergies: PropTypes.array,
    diet: PropTypes.object,
    dislikedProducts: PropTypes.array,
    inventories: PropTypes.array,
    onboarding: PropTypes.array,
  }),
  step: PropTypes.string,
  steps: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
  onQuizSubmit: PropTypes.func.isRequired,
  onWelcomeClose: PropTypes.func.isRequired,
};

export default Onboarding;
