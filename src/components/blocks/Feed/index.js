
import { connect } from 'react-redux';

import platformPick from 'helpers/platformPick';

import recipes from 'actions/recipes';

import Feed from './Feed';

const actions = platformPick({
  mobile: {
    onSelect: recipes.select,
  },

  default: {},
});

export default connect(null, actions)(Feed);
