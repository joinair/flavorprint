
import { connect } from 'react-redux';

import { RECIPE_PRINT } from 'constants/AnalyticsEventTypes';
import { RECIPE_ID, RECIPE_URL } from 'constants/QueryParams';
import { PRINT_RECIPE } from 'constants/Routes';

import popupWindowPosition from 'helpers/popupWindowPosition';

import Button from './Button';

const printRecipe = recipe => {
  const width = 900;
  const height = 600;
  const { left, top } = popupWindowPosition(width, height);

  const key = recipe.externalUrl ? RECIPE_URL : RECIPE_ID;
  const value = recipe.externalUrl ? recipe.externalUrl : recipe.id;

  const printWindow = window.open(
    `${PRINT_RECIPE}?${key}=${value}`,
    '',
    'scrollbars=1,resizable=1,' +
    `width=${width},height=${height},left=${left},top=${top}`
  );

  if (printWindow && printWindow.focus) { printWindow.focus(); }
};

const actions = (dispatch, props) => ({
  onPrint() {
    dispatch({ type: RECIPE_PRINT });
    printRecipe(props.recipe);
  },
});

export default connect(null, actions)(Button);
