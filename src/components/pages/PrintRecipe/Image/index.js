
import React, { PropTypes } from 'react';

import './styles.css';

import CloudinaryImage from 'components/ui-elements/CloudinaryImage';

const WIDTH = 175;
const HEIGHT = 175;

const PrintRecipeImage = ({ recipe }) => (
  <div className="PrintRecipeImage">
    <CloudinaryImage
      className="PrintRecipeImage-image"
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
      title={recipe.data.name}
      transformation="c_fill,f_auto,e_sharpen"
    />
  </div>
);

PrintRecipeImage.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default PrintRecipeImage;
