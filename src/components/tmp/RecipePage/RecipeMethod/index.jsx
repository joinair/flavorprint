
import React, { PropTypes } from 'react';

import map from 'lodash/map';

import getSharingPath from 'components/tmp/RecipePage/helpers/getSharingPath';

import ExternalRecipeLink from 'components/tmp/RecipePage/ExternalRecipeLink';
import PrintButton from 'components/tmp/RecipePage/Print/Button';
import Button from 'components/ui-elements/Button';
import SharingIcons from 'components/tmp/SharingIcons';

const Instruction = ({ instruction }) => (
  <div className="RecipePage-instruction">
    {instruction.text}
  </div>
);

const RecipeMethod = ({ recipe, sharingConfig }) => {
  const { externalUrl, data: { sourceUrl, publisher } } = recipe;

  if (externalUrl) {
    return (
      <div className="RecipePage-instructions">
        Read the directions for this recipe at{' '}
        <ExternalRecipeLink href={externalUrl}>
          {publisher.displayName}
        </ExternalRecipeLink>

        <ExternalRecipeLink href={sourceUrl}>
          <Button color="primary">
            Read method on {publisher.displayName}
          </Button>
        </ExternalRecipeLink>
      </div>
    );
  }

  const items = map(recipe.data.instructions, (instruction, index) =>
    <Instruction instruction={instruction} key={index} />
  );

  return (
    <div className="RecipePage-instructions">
      <div className="RecipePage-instructionList">
        {items}
      </div>

      {!externalUrl && sourceUrl && (
        <div>
          <ExternalRecipeLink href={sourceUrl}>
            <Button
              outline
              color="danger"
            >
              Read method on {publisher.displayName}
            </Button>
          </ExternalRecipeLink>
        </div>
      )}

      <div className="RecipePage-meta">
        <div className="RecipePage-print">
          <PrintButton recipe={recipe} />
        </div>

        <div className="RecipePage-share RecipePage-share--small">
          <div className="RecipePage-share-text">
            Share recipe:
          </div>
          <SharingIcons
            config={sharingConfig}
            path={getSharingPath(recipe)}
            small
          />
        </div>
      </div>
    </div>
  );
};

Instruction.propTypes = {
  instruction: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
};

RecipeMethod.propTypes = {
  recipe: PropTypes.shape({
    instructions: PropTypes.array,
  }),

  sharingConfig: PropTypes.object.isRequired,
};

export default RecipeMethod;
