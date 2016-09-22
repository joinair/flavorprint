
import React, { Component, PropTypes } from 'react';

import assign from 'lodash/assign';
import bind from 'lodash/bind';
import find from 'lodash/find';
import get from 'lodash/get';
import map from 'lodash/map';
import partial from 'lodash/partial';

import { getGroupId } from 'helpers/onboarding';

import OnboardingRecipe from 'components/modals/Onboarding/Recipe';
import OnboardingHeader from 'components/modals/Onboarding/OnboardingHeader';
import OnboardingFooter from 'components/modals/Onboarding/OnboardingFooter';

const isContinuable = field => field !== undefined;

const getStepData = (step, preferences) => {
  const groupId = getGroupId(step);
  return find(preferences.recipes, { groupId });
};

class OnboardingRecipes extends Component {
  constructor(props) {
    super(props);

    this.handleChange = bind(this.handleChange, this);
    this.handleContinue = bind(this.handleContinue, this);

    const groupId = getGroupId(props.step);
    const value = get(props.fields, `recipes.${groupId}`);

    this.state = {
      canContinue: isContinuable(value),
      value,
    };
  }

  componentWillUnmount() {
    clearTimeout(this.transitionTimer);
  }

  handleChange(value) {
    this.setState({
      canContinue: isContinuable(value),
      value,
    });

    this.transitionTimer = setTimeout(this.handleContinue, 500);
  }

  handleContinue() {
    const groupId = getGroupId(this.props.step);

    this.props.onContinue({
      recipes: assign({}, this.props.fields.recipes, {
        [groupId]: this.state.value,
      }),
    });
  }

  render() {
    const {
      cancelable, preferences, step,
      onBack, onCancel, onClose, onSkip,
    } = this.props;
    const { canContinue, value } = this.state;

    const stepData = getStepData(step, preferences);

    const recipeList = map(stepData.values, recipe =>
      <div
        className="Onboarding-recipe"
        key={recipe.url}
      >
        <OnboardingRecipe
          recipe={recipe}
          selected={value === recipe.url}
          onSelect={partial(this.handleChange, recipe.url)}
        />
      </div>
    );

    return (
      <div className="Onboarding-modalContainer">
        <OnboardingHeader
          title={stepData.title}
          onClose={onClose}
        />

        <div className="Onboarding-modalBody">
          <div className="Onboarding-modalBody-container">
            <div className="Onboarding-recipes">
              {recipeList}
            </div>
          </div>
        </div>

        <OnboardingFooter
          buttons={[
            cancelable ? 'Cancel' : 'Back',
            'Continue',
            'Skip',
          ]}
          canContinue={canContinue}
          onBack={onBack}
          onCancel={onCancel}
          onContinue={this.handleContinue}
          onSkip={onSkip}
        />
      </div>
    );
  }
}

OnboardingRecipes.propTypes = {
  cancelable: PropTypes.bool.isRequired,
  fields: PropTypes.shape({
    recipes: PropTypes.object,
  }).isRequired,
  preferences: PropTypes.shape({
    recipes: PropTypes.array,
  }).isRequired,
  step: PropTypes.string.isRequired,
  synced: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
};

export default OnboardingRecipes;
