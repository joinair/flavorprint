
import React, { PropTypes } from 'react';

import iconDish from 'assets/images/icons/icon-dish.svg';

import Icon from 'components/ui-elements/Icon';
import LazyImage from 'components/ui-elements/LazyImage';

const WIDTH = 585;
const HEIGHT = 345;

const RecipeImage = ({ recipe }) => (
  recipe.data.image
    ? (
      <LazyImage
        className="RecipePage-image"
        image={recipe.data.image}
        maxHeight={
          recipe.data.image.height
            ? Math.min(recipe.data.image.height | 0, HEIGHT)
            : HEIGHT
        }
        maxWidth={
          recipe.data.image.width
            ? Math.min(recipe.data.image.width | 0, WIDTH)
            : WIDTH
        }
        previewTransformation="c_fill,f_auto,e_blur:3000"
        title={recipe.data.name}
        transformation="c_fill,f_auto,e_sharpen"
      />
    ) : (
      <div className="RecipePage-fallback">
        <div className="RecipePage-fallbackContainer">
          <Icon
            className="RecipePage-fallbackIcon"
            glyph={iconDish}
          />
        </div>
      </div>
    )
);

RecipeImage.propTypes = {
  recipe: PropTypes.shape({
    data: PropTypes.shape({
      image: PropTypes.shape({
        url: PropTypes.string,
      }),
      name: PropTypes.string,
    }).isRequired,
  }),
};

export default RecipeImage;
