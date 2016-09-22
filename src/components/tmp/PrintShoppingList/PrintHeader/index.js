
import { connect } from 'react-redux';

import PrintHeader from './PrintHeader';

const actions = dispatch => ({
  onPrint: () => {
    const { SHOPPING_LIST_PRINT } = require('constants/AnalyticsEventTypes');

    dispatch({ type: SHOPPING_LIST_PRINT });
    window.print();
  },
});

export default connect(null, actions)(PrintHeader);
