
import React, { PropTypes } from 'react';

import includes from 'lodash/includes';

import './styles.css';

import Button from 'components/ui-elements/Button';

const OnboardingFooter = ({
  buttons, canContinue,
  onBack, onCancel, onContinue, onSkip,
}) => (
  <div className="OnboardingFooter">
    {includes(buttons, 'Cancel') &&
      <Button
        className="OnboardingFooter-leftButton"
        color="transparent"
        onClick={onCancel}
      >
        Cancel
      </Button>
    }
    {includes(buttons, 'Back') &&
      <Button
        className="OnboardingFooter-leftButton"
        color="transparent"
        onClick={onBack}
      >
        Back
      </Button>
    }
    {includes(buttons, 'Continue') &&
      <Button
        color="danger"
        disabled={!canContinue}
        size="xLarge"
        onClick={onContinue}
      >
        Continue
      </Button>
    }
    {includes(buttons, 'Skip') &&
      <Button
        className="OnboardingFooter-rightButton"
        color="transparent"
        onClick={onSkip}
      >
        Skip
      </Button>
    }
  </div>
);

OnboardingFooter.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.oneOf(['Back', 'Cancel', 'Continue', 'Skip'])
  ),
  canContinue: PropTypes.bool,
  onBack: PropTypes.func,
  onCancel: PropTypes.func,
  onContinue: PropTypes.func,
  onSkip: PropTypes.func,
};

OnboardingFooter.defaultProps = {
  buttons: [],
  canContinue: true,
};

export default OnboardingFooter;
