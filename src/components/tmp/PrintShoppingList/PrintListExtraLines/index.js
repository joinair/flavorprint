
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PrintListExtraLines from './PrintListExtraLines';

const isPrintListExtraLinesVisibleSelector = state => state.printList.isExtraLinesVisible;

const groupedSelector = createStructuredSelector({
  isExtraLinesVisible: isPrintListExtraLinesVisibleSelector,
});

export default connect(groupedSelector)(PrintListExtraLines);
