
import { connect } from 'react-redux';

import PopularItems from './PopularItems';

import shoppingList from 'actions/shoppingList';

const actions = (dispatch, props) => ({
  onClick: ({ categoryAnalysisContainer, text }) => {
    dispatch(shoppingList.addItem({ text }, 'Autocomplete',
      { categoryAnalysisContainer }));

    props.onClose();
  },
});

export default connect(null, actions)(PopularItems);
