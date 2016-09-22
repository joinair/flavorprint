
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import concat from 'lodash/concat';
import find from 'lodash/find';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import partial from 'lodash/partial';
import reject from 'lodash/reject';
import size from 'lodash/size';

import { ALLERGIES, DIETS } from './data';

import OnboardingAvoidances from 'components/modals/Onboarding/Avoidances';
import OnboardingBubbleList from 'components/modals/Onboarding/OnboardingBubbleList';
import OnboardingHeader from 'components/modals/Onboarding/OnboardingHeader';
import OnboardingFooter from 'components/modals/Onboarding/OnboardingFooter';
import OnboardingToggler from 'components/modals/Onboarding/Toggler';

class OnboardingCombinedAvoidances extends Component {
  constructor(props) {
    super(props);

    this.handleAllergiesChange = bind(this.handleAllergiesChange, this);
    this.handleAvoidancesChange = bind(this.handleAvoidancesChange, this);
    this.handleContinue = bind(this.handleContinue, this);
    this.handleDietChange = bind(this.handleDietChange, this);
    this.handleTogglerChange = bind(this.handleTogglerChange, this);

    this.state = {
      fields: {
        diet: props.synced ? props.fields.diet : null,
        allergies: props.synced ? props.fields.allergies : [],
        dislikedProducts: props.synced ? props.fields.dislikedProducts : [],
      },
      selectedTogglerIndex: null,
    };
  }

  handleContinue() {
    this.props.onContinue(this.state.fields);
  }

  prepareAllergiesValue() {
    const value = this.state.fields.allergies;

    if (value === undefined) {
      return value;
    }

    return !isEmpty(value)
      ? map(value, 'canonicalName')
      : null;
  }

  prepareAllergiesItems() {
    const items = this.props.preferences.allergies;

    return map(items, item => ({
      text: item.text,
      value: item.canonicalName,
      ...ALLERGIES[item.canonicalName],
    }));
  }

  prepareDietValue() {
    const value = this.state.fields.diet;

    if (value) {
      return get(value, 'canonicalName', null);
    }

    return null;
  }

  prepareDietItems() {
    const items = this.props.preferences.diets;

    return map(items, item => ({
      text: item.text,
      value: item.canonicalName,
      ...DIETS[item.canonicalName],
    }));
  }

  handleDietChange(key) {
    const diet = find(this.props.preferences.diets, {
      canonicalName: key,
    });

    this.setState({
      fields: {
        ...this.state.fields,
        diet: diet === this.state.fields.diet ? null : diet,
      },
    });
  }

  handleAllergiesChange(key, checked) {
    const allergy = find(this.props.preferences.allergies, {
      canonicalName: key,
    });

    const allergies = checked
      ? concat(this.state.fields.allergies, allergy)
      : reject(this.state.fields.allergies, allergy);

    this.setState({
      fields: { ...this.state.fields, allergies },
    });
  }

  handleAvoidancesChange(value) {
    this.setState({
      fields: {
        ...this.state.fields,
        dislikedProducts: value,
      },
    });
  }

  handleTogglerChange(index, open) {
    const currentIndex = this.state.selectedTogglerIndex;

    let value;
    if (index === currentIndex) {
      value = open ? index : null;
    } else {
      value = index;
    }

    this.setState({
      selectedTogglerIndex: value,
    });
  }

  render() {
    const {
      cancelable, preferences,
      onBack, onCancel, onClose, onSkip,
    } = this.props;
    const { fields, selectedTogglerIndex } = this.state;

    const getTogglerProps = index => ({
      open: selectedTogglerIndex === index,
      onChange: partial(this.handleTogglerChange, index),
    });

    return (
      <div className="Onboarding-modalContainer">
        <OnboardingHeader
          subtitle="We’ll only show you recipes that are right for you."
          title="Do you have any diets or allergies?"
          onClose={onClose}
        />

        <div className="Onboarding-modalBody Onboarding-modalBody--withoutMargins">
          <div className="Onboarding-modalBody-container">
            <OnboardingToggler
              {...getTogglerProps(0)}
              count={fields.diet ? 1 : 0}
              label="Diet"
            >
              <OnboardingBubbleList
                items={this.prepareDietItems()}
                value={this.prepareDietValue()}
                onChange={this.handleDietChange}
              />
            </OnboardingToggler>

            <OnboardingToggler
              {...getTogglerProps(1)}
              count={size(fields.allergies)}
              label="Allergies"
            >
              <OnboardingBubbleList
                items={this.prepareAllergiesItems()}
                itemsStyle="blocked"
                value={this.prepareAllergiesValue()}
                onChange={this.handleAllergiesChange}
              />
            </OnboardingToggler>

            <OnboardingToggler
              {...getTogglerProps(2)}
              count={size(fields.dislikedProducts)}
              label="Dislikes"
            >
              <OnboardingAvoidances
                allergies={fields.allergies}
                diet={fields.diet}
                preferences={preferences}
                value={fields.dislikedProducts}
                onChange={this.handleAvoidancesChange}
              />
            </OnboardingToggler>
          </div>
        </div>

        <OnboardingFooter
          buttons={[
            cancelable ? 'Cancel' : 'Back',
            'Continue',
            'Skip',
          ]}
          onBack={onBack}
          onCancel={onCancel}
          onContinue={this.handleContinue}
          onSkip={onSkip}
        />
      </div>
    );
  }
}

OnboardingCombinedAvoidances.propTypes = {
  cancelable: PropTypes.bool.isRequired,
  fields: PropTypes.shape({
    allergies: PropTypes.array,
    diet: PropTypes.object,
    dislikedProducts: PropTypes.array,
  }).isRequired,
  preferences: PropTypes.shape({
    allergies: PropTypes.array,
    diets: PropTypes.array,
    dislikedProducts: PropTypes.array,
  }).isRequired,
  synced: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
};

export default OnboardingCombinedAvoidances;
