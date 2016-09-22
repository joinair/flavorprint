
import React, { PropTypes } from 'react';

import get from 'lodash/get';

import { ALL_RECIPES_COLLECTION } from 'constants/QueryParams';

import './Cookbook.css';

import AuthForOnboarding from 'components/banners/AuthForOnboarding';
import { CenteredPreloader } from 'components/ui-elements/Preloader';

import Header from './Header';
import Menu from './Menu';
import Meta from './Meta';

import {
  CollectionPlaceholder,
  CookbookPlaceholder,
  SharedCookbookPlaceholder,
} from './Placeholder';

import Profile from './Profile';
import Recipes from './Recipes';

const Cookbook = ({
  isFetching, isShared,
  activeCollectionId, collections, totalRecipeCount,
  user,
}) => {
  if (isFetching) {
    return (
      <div>
        <CenteredPreloader />
        <AuthForOnboarding />
      </div>
    );
  }

  let placeholder;

  if (isShared) {
    const firstName = get(user, 'profile.firstName');

    placeholder = firstName
      ? (
        <SharedCookbookPlaceholder
          title={`${firstName} hasn't saved any recipes yet`}
        />
      ) : (
        <SharedCookbookPlaceholder
          title="This collection is empty"
        />
      );
  } else if (ALL_RECIPES_COLLECTION === activeCollectionId) {
    placeholder = <CookbookPlaceholder />;
  } else {
    placeholder = <CollectionPlaceholder />;
  }

  return (
    <div className="Cookbook">
      <Meta profile={user.profile} />

      <Profile {...user} isShared={isShared} />

      <div className="AppLayout">
        <Menu
          isShared={isShared}
          activeCollectionId={activeCollectionId}
          collections={collections}
          totalRecipeCount={totalRecipeCount}
        />

        <Header
          isShared={isShared}
          activeCollectionId={activeCollectionId}
          collections={collections}
          totalRecipeCount={totalRecipeCount}
          user={user}
        />

        <div className="Cookbook-container AppContent AppContainer">
          <Recipes
            activeCollectionId={activeCollectionId}
            placeholder={placeholder}
          />
        </div>
      </div>

      <AuthForOnboarding />
    </div>
  );
};

Cookbook.propTypes = {
  isFetching: PropTypes.any,
  isShared: PropTypes.bool.isRequired,

  activeCollectionId: PropTypes.any.isRequired,
  collections: PropTypes.array.isRequired,
  totalRecipeCount: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

export default Cookbook;
