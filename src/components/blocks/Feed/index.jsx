
import React, { PropTypes } from 'react';

import map from 'lodash/map';

import './styles.css';

import Button from 'components/ui-elements/Button';
import Preloader from 'components/ui-elements/Preloader';
import RecipeCard from 'components/blocks/RecipeCard';

const Feed = ({
  component,
  isFetching,
  onShowMore,
  placeholder,
  recommendationName,
  recommendations,
  showMore,
}) => {
  if (!recommendations.length && isFetching) {
    return <Preloader />;
  }

  const CardComponent = component;

  const showMoreHandler = () => {
    document.body.scrollTop = 0;
    return onShowMore();
  };

  const showMoreButton = showMore && (
    <Button
      className="Feed-showMoreButton"
      outline
      size="xLarge"
      onClick={showMoreHandler}
    >
      More {recommendationName}
    </Button>
  );

  const renderRecommendation = (rec, index) =>
    <CardComponent
      key={rec.sourceId || index}
      recommendation={rec}
    />;

  const content = recommendations.length
    ? <div className="Feed-list">
        {map(recommendations, renderRecommendation)}
      </div>
    : placeholder;

  return (
    <div>
      <div className="Feed">
        {content}
        {isFetching && (
          <div className="Feed-loadingCover">
            <Preloader />
          </div>
        )}
      </div>
      {showMoreButton}
    </div>
  );
};

Feed.propTypes = {
  component: PropTypes.func,
  isFetching: PropTypes.any,
  placeholder: PropTypes.node,
  recommendationName: PropTypes.string.isRequired,
  recommendations: PropTypes.arrayOf(PropTypes.shape({
    sourceId: PropTypes.any,
  })).isRequired,
  showMore: PropTypes.bool,

  onShowMore: PropTypes.func,
};

Feed.defaultProps = {
  component: RecipeCard,
};

export default Feed;
