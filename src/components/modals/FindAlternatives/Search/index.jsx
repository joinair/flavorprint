
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FindAlternativesSearch from './Search';

const selector = createStructuredSelector({
  inventory: state => state.onlineCheckout.inventory,
});

export default connect(selector)(FindAlternativesSearch);
