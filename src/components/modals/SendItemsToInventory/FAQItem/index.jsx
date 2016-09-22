
import React, { PropTypes } from 'react';

import './styles.css';

const SendItemsToInventoryFAQItem = ({ item }) => (
  <div className="SendItemsToInventoryFAQItem">
    <div className="SendItemsToInventoryFAQItem-question">
      {item.question}
    </div>
    <div className="SendItemsToInventoryFAQItem-answer">
      {item.answer}
    </div>
  </div>
);

SendItemsToInventoryFAQItem.propTypes = {
  item: PropTypes.shape({
    answer: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
};

export default SendItemsToInventoryFAQItem;
