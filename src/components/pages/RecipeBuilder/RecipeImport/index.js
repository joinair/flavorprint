
import { connect } from 'react-redux';

import { VIEW_SOURCE, VIEW_FROM_RECIPE_IMPORT } from 'constants/QueryParams';
import { COOKBOOK, RECIPES_FROM_PARTNERS } from 'constants/Routes';

import { importByUrl } from 'actions/recipe';
import router from 'actions/router';

import RecipeImport from './RecipeImport';

const actions = {
  importByUrl,

  navigateToExternalUrl: url => router.push(RECIPES_FROM_PARTNERS, {
    url,
    [VIEW_SOURCE]: VIEW_FROM_RECIPE_IMPORT,
  }),

  navigateToCookbook: () => router.push(COOKBOOK, {
    [VIEW_SOURCE]: VIEW_FROM_RECIPE_IMPORT,
  }),
};

export default connect(null, actions)(RecipeImport);
