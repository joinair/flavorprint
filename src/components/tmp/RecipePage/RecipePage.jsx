
import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import getSharingPath from './helpers/getSharingPath';
import isEnoughData from './helpers/isEnoughData';
import pinterest from 'helpers/pinterest';
import twitter from 'helpers/twitter';

import './styles.css';

import AuthForOnboarding from 'components/banners/AuthForOnboarding';
import { CenteredPreloader } from 'components/ui-elements/Preloader';

import Meta from './Meta';
import RecipeActions from './RecipeActions';
import RecipeAffiliation from './RecipeAffiliation';
import RecipeAlternativeRecipes from './RecipeAlternativeRecipes';
import RecipeImage from './RecipeImage';
import RecipeIngredients from './RecipeIngredients';
import RecipeMethod from './RecipeMethod';
import RecipePageDirections from './Directions';
import RecipePagePrint from './Print';
import RecipeStats from './RecipeStats';
import RecipeQuote from './RecipeQuote';
import SharingIcons from 'components/tmp/SharingIcons';

class RecipePage extends Component {
  componentDidMount() {
    const { recipe, shouldSelect, onSelect } = this.props;
    if (shouldSelect) { onSelect(recipe); }
  }

  render() {
    const {
      isFetching,
      isOwn,

      recipe,
      shouldOpenPopup,
      alternativeRecipes,
    } = this.props;

    const isErrored = !recipe;

    if (isErrored || (!recipe.externalUrl && !recipe.id) || isFetching) {
      return (
        <div>
          <CenteredPreloader />
          <AuthForOnboarding />
        </div>
      );
    }

    const sharingConfig = {
      pinterest: pinterest.recipeToConfig(recipe),
      twitter: twitter.recipeToConfig(recipe),
    };

    const {
      data: {
        description, durations, ingredients, instructions,
        name, recipeYield,
      },
      user,
    } = recipe;

    const profile = user || {};

    const mainClasses = classnames('RecipePage-main', {
      'RecipePage-main--column': recipe.externalUrl,
    });

    return (
      <div className="RecipePage">
        {!isFetching && !isErrored && <Meta recipe={recipe} />}
        <div className="RecipePage-header">
          <div className="RecipePage-container RecipePage-header-layout">
            <RecipeImage recipe={recipe} />

            <div className="RecipePage-description">
              <h1 className="RecipePage-title">
                {name}
              </h1>

              <div className="RecipePage-affiliation">
                <RecipeAffiliation
                  isOwn={isOwn}
                  profile={profile}
                  recipe={recipe}
                />
              </div>

              {!isEnoughData(recipe) &&
                <div className="RecipePage-share">
                  <div className="RecipePage-share-text">
                    Share recipe:
                  </div>

                  <SharingIcons
                    config={sharingConfig}
                    path={getSharingPath(recipe)}
                    rounded
                  />
                </div>
              }

              {Boolean(description) &&
                <RecipeQuote profile={profile} recipe={recipe} />
              }

              {
                Boolean(
                  get(durations, 'cook') || get(durations, 'prop') || recipeYield
                ) && <RecipeStats recipe={recipe} />
              }

              <RecipeActions
                isOwn={isOwn}
                profile={profile}
                recipe={recipe}
                sharingConfig={sharingConfig}
                shouldOpenPopup={shouldOpenPopup}
              />
            </div>
          </div>
        </div>

        <div className="RecipePage-content">
          <div className="RecipePage-container RecipePage-content-layout">
            <div className={mainClasses}>
              {!isEmpty(ingredients) &&
                <div className="RecipePage-block RecipePage-block--ingredients">
                  <h2 className="RecipePage-block-title">
                    Ingredients
                  </h2>

                  <div className="RecipePage-block-content">
                    <RecipeIngredients recipe={recipe} />
                  </div>
                </div>
              }

              {!recipe.externalUrl && !isEmpty(instructions) &&
                <div className="RecipePage-block RecipePage-block--directions">
                  <h2 className="RecipePage-block-title">
                    Directions
                  </h2>

                  <div className="RecipePage-block-content">
                    <RecipeMethod recipe={recipe} sharingConfig={sharingConfig} />
                  </div>

                  <RecipeActions
                    className="RecipePage-actions--showS"
                    isOwn={isOwn}
                    profile={profile}
                    recipe={recipe}
                    sharingConfig={sharingConfig}
                    shouldOpenPopup={shouldOpenPopup}
                  />
                </div>
              }

              {!!recipe.externalUrl &&
                <div className="RecipePage-directions">
                  <RecipePageDirections recipe={recipe} />
                </div>
              }

              {!!recipe.externalUrl &&
                <div className="RecipePage-print">
                  <RecipePagePrint
                    recipe={recipe}
                    sharingConfig={sharingConfig}
                  />
                </div>
              }
            </div>

            {!isEmpty(alternativeRecipes.entries) &&
              <div className="RecipePage-aside">
                <div className="RecipePage-block RecipePage-block--alternatives">
                  <h3 className="RecipePage-block-title">
                    Related recipes
                  </h3>
                  <div className="RecipePage-block-content">
                    <RecipeAlternativeRecipes alternativeRecipes={alternativeRecipes} />
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <AuthForOnboarding />
      </div>
    );
  }
}

RecipePage.propTypes = {
  isFetching: PropTypes.any,
  isOwn: PropTypes.bool.isRequired,

  alternativeRecipes: PropTypes.shape({
    entries: PropTypes.array,
  }),

  recipe: PropTypes.shape({
    cookbook: PropTypes.shape({
      saved: PropTypes.bool,
    }),

    data: PropTypes.shape({
      description: PropTypes.string,
      durations: PropTypes.shape({
        cook: PropTypes.number,
        prep: PropTypes.number,
      }),
      image: PropTypes.shape({
        url: PropTypes.string,
      }),
      name: PropTypes.string,
      recipeYield: PropTypes.number,
    }).isRequired,

    user: PropTypes.shape({
      avatar: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string,
    }),

    externalUrl: PropTypes.string,
    id: PropTypes.string,
    ingredients: PropTypes.array,
    instructions: PropTypes.array,
  }),

  shouldOpenPopup: PropTypes.bool.isRequired,
  shouldSelect: PropTypes.bool.isRequired,

  onSelect: PropTypes.func.isRequired,
};

export default RecipePage;
