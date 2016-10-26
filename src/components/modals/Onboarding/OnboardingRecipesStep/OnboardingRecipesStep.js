
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import debounce from 'lodash/debounce';
import filter from 'lodash/filter';
import map from 'lodash/map';

import OnboardingRecipe from '../OnboardingRecipe';

import './styles.css';

class OnboardingRecipesStep extends Component {
  constructor(props, context) {
    super(props, context);
    this.selectRecipe = bind(this.selectRecipe, this);
    this.selectRecipe = debounce(this.selectRecipe, 1000);

    this.state = {
      selectedRecipes: props.selectedRecipes,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ selectedRecipes: props.selectedRecipes });
  }

  onSelectRecipe(sourceId) {
    return () => {
      this.setState({
        selectedRecipes: [sourceId],
      });
      this.selectRecipe(sourceId);
    };
  }

  selectRecipe(sourceId) {
    const deselect = map(
      filter(this.props.recipes, x => x.sourceId !== sourceId),
      'sourceId'
    );

    this.props.onSelectRecipe(sourceId, deselect);
  }

  render() {
    const { recipes } = this.props;
    const { selectedRecipes } = this.state;

    return (
      <div className="OnboardingRecipesStep">
        {map(recipes, (recipe, id) => (
          <div key={id} className="OnboardingRecipesStep-recipe">
            <OnboardingRecipe
              recipe={recipe}
              selected={selectedRecipes.indexOf(recipe.sourceId) >= 0}
              onClick={this.onSelectRecipe(recipe.sourceId)}
            />
          </div>
        ))}
      </div>
    );
  }
}

OnboardingRecipesStep.propTypes = {
  recipes: PropTypes.array.isRequired,
  selectedRecipes: PropTypes.array.isRequired,
  onSelectRecipe: PropTypes.func.isRequired,
};

export default OnboardingRecipesStep;
