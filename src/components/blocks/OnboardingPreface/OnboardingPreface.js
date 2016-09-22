
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import map from 'lodash/map';
import partial from 'lodash/partial';

import OnboardingRecipe from 'components/modals/Onboarding/Recipe';
import Button from 'components/ui-elements/Button';

import iconArrowRight from 'assets/images/icons/icon-arrow-right.svg';
import './styles.css';

const OnboardingBanner = ({ onContinue }) => (
  <div className="OnboardingBanner">
    <div className="OnboardingBanner-container">
      <div className="OnboardingBanner-content">
        <h1 className="OnboardingBanner-heading">
          Finish setting up your profile
        </h1>

        <div className="OnboardingBanner-description">
          Teach Whisk what you like by answering a few quick questions.
        </div>

        <div className="OnboardingBanner-action">
          <Button
            icon={iconArrowRight}
            iconBefore={false}
            iconStyle={{ height: 14, width: 20.5 }}
            size="large"
            media="xl-xLarge"
            onClick={onContinue}
          >
            Finish profile setup
          </Button>
        </div>
      </div>
    </div>
  </div>
);

class OnboardingPreface extends Component {
  constructor(props) {
    super(props);

    this.handleChange = bind(this.handleChange, this);
    this.handleContinue = bind(this.handleContinue, this);

    this.state = {
      value: null,
    };
  }

  componentDidMount() {
    this.props.onVisible();
  }

  componentWillUnmount() {
    clearTimeout(this.transitionTimer);
  }

  handleChange(value) {
    this.setState({ value });
    this.transitionTimer = setTimeout(this.handleContinue, 500);
  }

  handleContinue() {
    this.props.onStepComplete(this.state.value);
  }

  render() {
    const { stepData, completePercentage, onContinue } = this.props;

    if (completePercentage > 0) {
      return <OnboardingBanner onContinue={onContinue} />;
    }

    const recipeList = map(stepData.values, recipe =>
      <div
        className="OnboardingPreface-recipe"
        key={recipe.url}
      >
        <OnboardingRecipe
          recipe={recipe}
          selected={this.state.value === recipe.url}
          onSelect={partial(this.handleChange, recipe.url)}
        />
      </div>
    );

    return (
      <div className="OnboardingPreface">
        <div className="OnboardingPreface-title">
          {stepData.title}
        </div>

        <div className="OnboardingPreface-description">
          Teach Whisk what you like by answering a few quick questions.
        </div>

        <div className="OnboardingPreface-recipes">
          {recipeList}
        </div>
      </div>
    );
  }
}

OnboardingBanner.propTypes = {
  onContinue: PropTypes.func.isRequired,
};

OnboardingPreface.propTypes = {
  completePercentage: PropTypes.number,
  stepData: PropTypes.shape({
    groupId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
  }).isRequired,
  onContinue: PropTypes.func.isRequired,
  onStepComplete: PropTypes.func.isRequired,
  onVisible: PropTypes.func.isRequired,
};

export default OnboardingPreface;
