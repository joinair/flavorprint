
import React, { PropTypes } from 'react';

import Button from 'components/ui-elements/Button';

const RecipeActions = ({ publishOnly, recipeId, onDelete, onSave }) => (
  <div className="RecipeBuilder-actionGroup">
    {!!recipeId && !publishOnly &&
      <div className="RecipeBuilder-actionGroup-item RecipeBuilder-actionGroup-item--delete">
        <Button
          className="RecipeBuilder-button RecipeBuilder-button--delete"
          color="transparent"
          size="large"
          onClick={onDelete}
        >
          Delete recipe
        </Button>
      </div>
    }
    {!!recipeId && !publishOnly &&
      <div className="RecipeBuilder-actionGroup-item RecipeBuilder-actionGroup-item--save">
        <Button
          className="RecipeBuilder-button RecipeBuilder-button--save"
          size="large"
          onClick={onSave}
        >
          Save changes
        </Button>
      </div>
    }
    {(publishOnly || !recipeId) &&
      <div className="RecipeBuilder-actionGroup-item RecipeBuilder-actionGroup-item--publish">
        <Button
          className="RecipeBuilder-button RecipeBuilder-button--publish"
          size="large"
          onClick={onSave}
        >
          Publish recipe
        </Button>
      </div>
    }
  </div>
);

RecipeActions.propTypes = {
  recipeId: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  publishOnly: PropTypes.bool,
};

export default RecipeActions;
