
import { parse } from 'qs';

import identity from 'lodash/identity';
import noop from 'lodash/noop';
import Rx from 'rx';

import collections from 'actions/collections';
import fetching from 'actions/fetching';
import notFound from 'actions/notFound';
import recipe from 'actions/recipe';
import shoppingList from 'actions/shoppingList';

import initialLoad from 'helpers/initialLoad';

import { RECIPES_NEW, RECIPES_IMPORT } from 'constants/Routes';

import redirectToAuthPage from '../helpers/redirectToAuthPage';

import RecipeBuilder from 'components/pages/RecipeBuilder';
import RecipeBuilderTabs from 'components/pages/RecipeBuilder/RecipeBuilderTabs';
import RecipeImport from 'components/pages/RecipeBuilder/RecipeImport';
import RecipePage from 'components/tmp/RecipePage';

export default store => [
  {
    component: RecipeBuilderTabs,
    onEnter: redirectToAuthPage(store),

    prepareData() {
      if (!initialLoad() && global.Platform.OS === 'browser') {
        store.dispatch(recipe.reset());
      }
    },

    childRoutes: [
      {
        path: RECIPES_NEW,
        component: RecipeBuilder,
        analyticsTag: 'New recipe',
      },
      {
        path: RECIPES_IMPORT,
        component: RecipeImport,
        analyticsTag: 'Import recipe by URL',
      },
    ],
  },

  {
    path: 'recipes/from-partners',
    component: RecipePage,
    analyticsTag: 'Recipe view',

    prepareData({ location }) {
      if (!initialLoad()) {
        const query = parse(location.search.substr(1));
        const { url } = query;

        if (url) {
          if (global.Platform.OS === 'browser') {
            store.dispatch(fetching.start(fetching.GROUP_IDS.RECIPE_PAGE));
          }

          const state = store.getState();
          const { user } = state;

          const observables = [
            store.dispatch(recipe.loadFromPartners(url)),
            store.dispatch(recipe.loadAlternativeRecipes(url)),
          ];

          if (user.JWTHeader) {
            observables.push(store.dispatch(shoppingList.loadOperations()));
          }

          if (global.Platform.OS === 'browser') {
            const onComplete = () =>
              store.dispatch(fetching.stop(fetching.GROUP_IDS.RECIPE_PAGE));

            Rx.Observable.from(observables).flatMap(identity)
              .subscribe(noop, onComplete, onComplete);
          }

          if (user.isAuthenticated && !state.collections.isFetched) {
            observables.push(store.dispatch(collections.load()));
          }

          return Rx.Observable.from(observables).flatMap(identity);
        }
      }
    },
  },

  {
    path: 'recipes/:id',
    component: RecipePage,
    analyticsTag: 'Recipe view',

    prepareData({ params }) {
      const { id } = params;

      if (!initialLoad() && id) {
        if (global.Platform.OS === 'browser') {
          store.dispatch(fetching.start(fetching.GROUP_IDS.RECIPE_PAGE));
        }

        const state = store.getState();
        const { user } = state;

        const observables = [
          store.dispatch(recipe.load(id)),
          store.dispatch(recipe.loadAlternativeRecipes(id)),
          store.dispatch(shoppingList.loadOperations()),
        ];

        if (global.Platform.OS === 'browser') {
          const onComplete = () =>
            store.dispatch(fetching.stop(fetching.GROUP_IDS.RECIPE_PAGE));

          Rx.Observable.from(observables).flatMap(identity)
            .subscribe(noop, onComplete, onComplete);
        }

        if (user.isAuthenticated && !state.collections.isFetched) {
          observables.push(store.dispatch(collections.load()));
        }

        return Rx.Observable.from(observables).flatMap(identity);
      }
    },
  },

  {
    path: 'recipes/:id/edit',
    component: RecipeBuilder,
    analyticsTag: 'Edit recipe',
    onEnter: redirectToAuthPage(store),

    prepareData({ params }) {
      const { id } = params;

      if (!initialLoad() && id) {
        if (global.Platform.OS === 'browser') {
          store.dispatch(fetching.start(fetching.GROUP_IDS.RECIPE_BUILDER_PAGE));
        }

        const fetcher$ = store.dispatch(recipe.load(id));

        const onComplete = () => {
          if (global.Platform.OS === 'browser') {
            store.dispatch(fetching.stop(fetching.GROUP_IDS.RECIPE_BUILDER_PAGE));
          }
        };

        const onSuccess = data => {
          if (data.userId !== store.getState().user.uid) {
            store.dispatch(notFound.show());
          }

          onComplete();
        };

        fetcher$.subscribe(onSuccess, onComplete);

        return fetcher$;
      }
    },
  },
];
