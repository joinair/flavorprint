
import { connect } from 'react-redux';

import {
  addItem,
  loadPopularItems,
} from 'actions/shoppingList';

export { AUTOCOMPLETE_TYPES } from './ItemsAutocomplete';
import ItemsAutocomplete from './ItemsAutocomplete';

const actions = {
  loadPopularItems,
  onSelect: addItem,
};

const selector = state => ({
  popularItems: state.shoppingList.popularItems,
});

export default connect(selector, actions, null, { withRef: true })(ItemsAutocomplete);
