
import React, { PropTypes } from 'react';

import map from 'lodash/map';

import OnboardingBubbleList from '../OnboardingBubbleList';

const OnboardingBubblesStep = ({
  bubbleStyle,
  bubbles,
  columns,
  onChange,
  values,
  large,
}) => (
  <div className="OnboardingBubblesStep">
    <OnboardingBubbleList
      value={values}
      onChange={onChange}
      itemsStyle={bubbleStyle}
      columns={columns}
      items={map(bubbles, bubble => ({
        image: `/assets/images/static-images/quiz/${bubble.image}.jpg`,
        imageSet: `/assets/images/static-images/quiz/${bubble.image}@2x.jpg 2x`,
        text: bubble.text,
        value: bubble.value,
        large,
      }))}
    />
  </div>
);

OnboardingBubblesStep.propTypes = {
  columns: PropTypes.number,
  bubbles: PropTypes.array.isRequired,
  bubbleStyle: PropTypes.string,
  values: PropTypes.array.isRequired,
  large: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default OnboardingBubblesStep;
