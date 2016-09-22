
import React from 'react';

import map from 'lodash/map';

import '../FAQ/styles.css';

import SendItemsToInventoryFAQItem from 'components/modals/SendItemsToInventory/FAQItem';

const items = [
  {
    question: 'How does this work?',
    answer: 'Whisk will transfer all the items in your ' +
      'shopping list to your Peapod basket. Then just ' +
      'go to Peapod.com to checkout. Simple, right?',
  },
  {
    question: 'Why do I need to enter my supermarket login?',
    answer: "So we know where to send your list, we don't " +
      "want your items ending up in someone else's basket. " +
      "We'll save your details so you don't have to enter them again.",
  },
  {
    question: 'Does Whisk have access to my account?',
    answer: "Whisk only sends items to your basket and doesn't " +
      'have access to any other account information. This means ' +
      'we can not sign you in.',
  },
];

const FAQ = () => (
  <div className="SendItemsToInventoryFAQ">
    {map(items, (item, i) =>
      <SendItemsToInventoryFAQItem item={item} key={i} />
    )}
  </div>
);

export default FAQ;
