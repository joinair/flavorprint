
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FindAlternativesOption from './Option';

const selector = createStructuredSelector({
  isTizen: state => state.tizen.isTizen,
  isTizenFridge: state => state.tizen.isFridge,
});

export default connect(selector)(FindAlternativesOption);
