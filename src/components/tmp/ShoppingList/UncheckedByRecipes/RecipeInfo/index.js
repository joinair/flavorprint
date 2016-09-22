
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { recipePageRoute } from 'helpers/routes';

import RecipeInfo from './RecipeInfo';

import { deselect, select } from 'actions/recipes';
import { removeRecipe } from 'actions/shoppingList';

const actions = (dispatch, props) => bindActionCreators({
  onDeselect: deselect,
  onRemove: removeRecipe,
  onSelect: select,
  onView: recipe => {
    props.routerActions.push(recipePageRoute(recipe));
  },
}, dispatch);

export default connect(null, actions)(RecipeInfo);
