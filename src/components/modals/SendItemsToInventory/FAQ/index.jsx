
import React, { PropTypes } from 'react';

import map from 'lodash/map';

import './styles.css';

import SendItemsToInventoryFAQItem from 'components/modals/SendItemsToInventory/FAQItem';

const getFAQItems = name => [
  {
    question: 'Why do I need to enter my supermarket login?',
    answer: 'So we know where to send your list. We’ll save your ' +
            'details so you don’t have to enter them again.',
  },
  {
    question: 'Why do I need to enter my password?',
    answer: 'Whisk uses your password to add items to ' +
            `your basket - we won’t log you in at ${name}.`,
  },
  {
    question: 'Does Whisk have access to my account?',
    answer: 'Whisk only sends items to your basket and doesn’t ' +
            'have access to any other account information. This means we can not sign you in.',
  },
  {
    question: `Why do I still need to sign in at ${name}?`,
    answer: `For security we can’t sign you in at ${name}. If you are already signed ` +
            'in you may need to sign out and back in again to see your updated basket.',
  },
];

const SendItemsToInventoryFAQ = ({ name }) => (
  <div className="SendItemsToInventoryFAQ">
    {map(getFAQItems(name), (item, i) =>
      <SendItemsToInventoryFAQItem item={item} key={i} />
    )}
  </div>
);

SendItemsToInventoryFAQ.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SendItemsToInventoryFAQ;
