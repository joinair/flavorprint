
import React, { PropTypes } from 'react';

import { VIEW_FROM_COOKBOOK } from 'constants/QueryParams';

import AddRecipeButton from 'components/blocks/AddRecipeButton';

export const CookbookPlaceholder = () =>
  <div className="CookbookPlaceholder">
    <div className="CookbookPlaceholder-container">
      <div className="CookbookPlaceholder-text">
        Use the heart to save recipes to your cookbook
      </div>

      <div className="CookbookPlaceholder-emptyCookbookIcon" />

      <div className="CookbookPlaceholder-delimeter">Or</div>

      <div>
        <AddRecipeButton
          className="CookbookPlaceholder-addRecipeBtn"
          size="xLarge"
          viewSource={VIEW_FROM_COOKBOOK}
        />
      </div>
    </div>
  </div>;

export const CollectionPlaceholder = () =>
  <div className="CookbookPlaceholder">
    <div className="CookbookPlaceholder-container">
      <div className="CookbookPlaceholder-text">
        Save recipes to this collection by ticking it in the save popup
      </div>

      <div className="CookbookPlaceholder-emptyCollectionIcon" />
    </div>
  </div>;

export const SharedCookbookPlaceholder = ({ title }) =>
  <div className="CookbookPlaceholder">
    <div className="CookbookPlaceholder-container">
      <div className="CookbookPlaceholder-title">{title}</div>
    </div>
  </div>;

SharedCookbookPlaceholder.propTypes = {
  title: PropTypes.string.isRequired,
};

export default {
  CollectionPlaceholder,
  CookbookPlaceholder,
  SharedCookbookPlaceholder,
};
