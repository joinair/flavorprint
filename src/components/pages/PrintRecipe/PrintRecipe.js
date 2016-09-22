
import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { domain } from 'constants/Config';

import iconLogo from 'assets/images/icons/whisk-logo.svg';
import './styles.css';

import Icon from 'components/ui-elements/Icon';
import PrintRecipeAffiliation from './Affiliation';
import PrintRecipeBlock from './Block';
import PrintRecipeDirections from './Directions';
import PrintRecipeImage from './Image';
import PrintRecipeIngredients from './Ingredients';
import PrintRecipeStats from './Stats';

class PrintRecipe extends Component {
  componentDidMount() {
    window.print();
  }

  render() {
    const { recipe } = this.props;

    const {
      data: {
        durations, ingredients, instructions,
        name, recipeYield,
      },
    } = recipe;

    const stats = !!(
      get(durations, 'prop') || get(durations, 'cook') || recipeYield
    ) && (
      <div className="PrintRecipe-stats">
        <PrintRecipeStats recipe={recipe} />
      </div>
    );

    const recipeUrl = recipe.externalUrl
      ? `${domain}/recipes/from-partners?url=${recipe.externalUrl}`
      : `${domain}/recipes/${recipe.id}`;

    const hasImage = !!this.props.recipe.data.image;
    const rootClasses = classnames('PrintRecipe', {
      'PrintRecipe--noImage': !hasImage,
    });

    return (
      <div className={rootClasses}>
        <div className="PrintRecipe-header">
          <div className="PrintRecipe-logo">
            <Icon
              glyph={iconLogo}
              style={{ height: '30px', width: '83px' }}
            />
          </div>
        </div>

        <div className="PrintRecipe-info">
          {hasImage &&
            <div className="PrintRecipe-image">
              <PrintRecipeImage recipe={this.props.recipe} />
            </div>
          }

          <div className="PrintRecipe-description">
            <h1 className="PrintRecipe-title">
              {name}
            </h1>

            <div className="PrintRecipe-affiliation">
              <PrintRecipeAffiliation
                profile={recipe.user || {}}
                recipe={recipe}
              />
            </div>

            {stats}
          </div>
        </div>

        <div className="PrintRecipe-content">
          {!!ingredients &&
            <div className="PrintRecipe-block PrintRecipe-block--ingredients">
              <PrintRecipeBlock title="Ingredients">
                <PrintRecipeIngredients recipe={recipe} />
              </PrintRecipeBlock>
            </div>
          }

          {!recipe.externalUrl && !isEmpty(instructions) &&
            <div className="PrintRecipe-block PrintRecipe-block--directions">
              <PrintRecipeBlock title="Directions">
                <PrintRecipeDirections recipe={recipe} />
              </PrintRecipeBlock>
            </div>
          }
        </div>

        {!!recipe.externalUrl &&
          <div className="PrintRecipe-content">
            <div className="PrintRecipe-block">
              <PrintRecipeBlock title="Directions">
                <PrintRecipeDirections external recipe={recipe} />
              </PrintRecipeBlock>
            </div>
          </div>
        }

        <div className="PrintRecipe-recipeUrl">
          {recipeUrl}
        </div>
      </div>
    );
  }
}

PrintRecipe.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default PrintRecipe;
