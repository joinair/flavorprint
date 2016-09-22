
import { connect } from 'react-redux';

import { checkItem, editItem, removeItem } from 'actions/shoppingList';

import UncheckedItem from './UncheckedItem';

const actions = {
  onCheck: checkItem,
  onEdit: editItem,
  onRemove: removeItem,
};

export default connect(null, actions)(UncheckedItem);
