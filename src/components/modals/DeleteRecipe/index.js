
import { connect } from 'react-redux';

import get from 'lodash/get';
import noop from 'lodash/noop';

import { COOKBOOK } from 'constants/Routes';

import recipe from 'actions/recipe';
import router from 'actions/router';

import DeleteRecipe from './DeleteRecipe';

const deleteRecipeSelector = () => ({});

const onDelete = () => (dispatch, getState) => {
  const id = get(getState(), 'router.params.id');

  if (id) {
    const onComplete = () => dispatch(router.replace(COOKBOOK));
    dispatch(recipe.destroy(id)).subscribe(noop, noop, onComplete);
  }
};

const actions = { onDelete };

export default connect(deleteRecipeSelector, actions)(DeleteRecipe);
