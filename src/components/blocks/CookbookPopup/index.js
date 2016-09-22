
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CookbookPopup from './CookbookPopup';

const selector = createStructuredSelector({
  recipes: ({ recipes }) => recipes.entries,
});

export default connect(selector, null, null, { withRef: true })(CookbookPopup);
