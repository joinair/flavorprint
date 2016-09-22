
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ShoppingListItems from './ShoppingListItems';

const actions = (dispatch, props) => bindActionCreators({
  onDone: () => props.routerActions.pop(),
}, dispatch);

export default connect(null, actions)(ShoppingListItems);
