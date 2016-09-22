
import { connect } from 'react-redux';

import recipes from 'actions/recipes';

import CollectionsPopup, { ServerSidePlaceholder } from './CollectionsPopup';

const actions = {
  onSelect: recipes.select,
};

export default global.Platform.OS === 'node'
  ? ServerSidePlaceholder
  : connect(null, actions)(CollectionsPopup);
