
import React, { PropTypes } from 'react';

import { BUTTON_CONTINUE } from 'constants/Onboarding';

import Button from 'components/ui-elements/Button';
import ModalHeader from 'components/tmp/Modal/ModalHeader';
import AuthenticationModal from 'components/modals/Authentication';

import './styles.css';

const SkipButton = ({ onClick }) => (
  <Button
    color="grey"
    fluid
    outline
    size="large"
    onClick={onClick}
  >
    Skip
  </Button>
);

const ContinueButton = ({ onClick }) => (
  <Button
    fluid
    size="large"
    onClick={onClick}
  >
    Continue
  </Button>
);

const Onboarding = ({
  isFirstStep,
  step,
  onPrevious,
  onNext,
  onClose,
}) => {
  if (!step.type) {
    return (
      <AuthenticationModal
        onClose={onClose}
        selectedTab="Sign up"
      />
    );
  }

  const StepComponent = step.type;

  return (
    <div className="Onboarding">
      <ModalHeader
        className="Onboarding-header"
        title={step.title}
        onClose={onClose}
      />

      <div className="Onboarding-mark" />

      <StepComponent {...step} />

      <div className="Onboarding-footer">
        <div className="Onboarding-footer-secondary">
          {!isFirstStep && (
            <Button
              color="transparent"
              outline
              size="large"
              onClick={onPrevious}
            >
              Back
            </Button>
          )}
        </div>
        <div className="Onboarding-footer-primary">
          {step.button === BUTTON_CONTINUE ? (
            <ContinueButton onClick={onNext} />
          ) : (
            <SkipButton onClick={onNext} />
          )}
        </div>
        <div className="Onboarding-footer-secondary" />
      </div>
    </div>
  );
};

SkipButton.propTypes = { onClick: PropTypes.func };
ContinueButton.propTypes = { onClick: PropTypes.func };

Onboarding.propTypes = {
  step: PropTypes.object.isRequired,
  isFirstStep: PropTypes.bool,

  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};

export default Onboarding;
