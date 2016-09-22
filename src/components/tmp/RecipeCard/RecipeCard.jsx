
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import classnames from 'classnames';
import get from 'lodash/get';

import { VIEW_SOURCE } from 'constants/QueryParams';

import iconDish from 'assets/images/icons/icon-dish.svg';
import iconRecommendationFork from 'assets/images/icons/icon-fork.svg';
import iconRecommendationLeaf from 'assets/images/icons/icon-leaf.svg';
import iconRecommendationTrending from 'assets/images/icons/icon-trending-recipe.svg';
import './styles.css';

import CollectionsPopup from 'components/blocks/CollectionsPopup';
import Icon from 'components/ui-elements/Icon';
import LazyImage from 'components/ui-elements/LazyImage';
import Button from 'components/ui-elements/Button';

const recommendationIcon = recommendation => {
  switch (recommendation) {
    case 'dinners': return (
      <Icon
        className="RecipeCard-panel-icon RecipeCard-panel-icon--dinners"
        glyph={iconRecommendationFork}
      />
    );

    case 'easyDinners': return (
      <Icon
        className="RecipeCard-panel-icon RecipeCard-panel-icon--easyDinners"
        glyph={iconRecommendationFork}
      />
    );

    case 'healthy': return (
      <Icon
        className="RecipeCard-panel-icon RecipeCard-panel-icon--healthy"
        glyph={iconRecommendationLeaf}
      />
    );

    case 'trending': return (
      <Icon
        className="RecipeCard-panel-icon RecipeCard-panel-icon--trending"
        glyph={iconRecommendationTrending}
      />
    );

    default: return undefined;
  }
};

const recommendationText = recommendation => {
  switch (recommendation) {
    case 'dinners': return 'Weekend dinner idea';
    case 'easyDinners': return 'Easy weeknight dinner';
    case 'healthy': return 'Healthy recipe';
    case 'trending': return 'Trending recipe';
    default: return undefined;
  }
};

const RecipePageLink = ({
  children,
  externalUrl,
  id,
  recommendation,
  viewSource,
  edit,
}) =>
  externalUrl
    ? (
      <Link
        className="RecipeCard-title-link"
        to={{
          pathname: '/recipes/from-partners',
          query: {
            recommendation,
            url: externalUrl,
            [VIEW_SOURCE]: viewSource,
          },
        }}
      >
        {children}
      </Link>
    ) : (
      <Link
        className="RecipeCard-title-link"
        to={{
          pathname: `/recipes/${id}/${edit ? 'edit' : ''}`,
          query: { recommendation, [VIEW_SOURCE]: viewSource },
        }}
      >
        {children}
      </Link>
    );

class RecipeCard extends Component {
  constructor(props) {
    super(props);
    this.state = { heartAnimation: false };
  }

  componentWillReceiveProps(nextProps) {
    if (get(this.props.recipe, 'cookbook.saved') !==
        get(nextProps.recipe, 'cookbook.saved')) {
      this.setState({ heartAnimation: true });
    }
  }

  render() {
    const { alternative, recipe, viewSource, uid } = this.props;
    const { data, externalUrl, id, isRemoved, tile, user, userId } = recipe;
    const { image, name, publisher, pendingExternal, sourceUrl } = data;
    const { heartAnimation } = this.state;

    const isSaved = !isRemoved && get(recipe, 'cookbook.saved');
    const recommendationType = get(tile, 'type');
    const recommendationString = recommendationText(recommendationType);

    const selectButtonClass = classnames('RecipeCard-like-icon', {
      'RecipeCard-like-icon--saved': isSaved,
      'is-animating': isSaved && heartAnimation,
    });

    const recipePanel = recommendationString && (
      <div className="RecipeCard-panel">
        <div className="RecipeCard-panel-container">
          <div className="RecipeCard-panel-imageContainer">
            {recommendationIcon(recommendationType)}
          </div>

          <div className="RecipeCard-panel-text">
            {recommendationString}
          </div>
        </div>
      </div>
    );

    const cardClasses = classnames(
      'RecipeCard',
      {
        'RecipeCard--alternative': alternative,
        'is-removed': isRemoved,
      }
    );

    const lazyImage = image
      ? (
        <LazyImage
          className="RecipeCard-image"
          image={image}
          maxHeight={alternative ? 200 : 320}
          maxWidth={alternative ? 275 : 320}
          previewTransformation="c_fill,q_50,f_auto,e_blur:1000"
          title={name}
          transformation="c_fill,f_auto,e_sharpen"
        />
      ) : (
        <div className="RecipeCard-fallback">
          <Icon
            className="RecipeCard-fallbackIcon"
            glyph={iconDish}
          />
        </div>
      );

    const publisherName = get(publisher, 'displayName');

    let subtitle;
    if (publisherName) {
      subtitle = <div className="RecipeCard-subtitle">{publisherName}</div>;
    } else if (user) {
      const fullname = `by ${get(user, 'firstName')} ${get(user, 'lastName', '')}`;

      subtitle =
        (get(user, 'cookbookVisibility') === 'public' || userId === uid)
          ? (
            <Link
              className="RecipeCard-subtitle RecipeCard-subtitle--link"
              to={`/${get(user, 'username')}`}
            >
              {fullname}
            </Link>
          )
          : (
            <div className="RecipeCard-subtitle">{fullname}</div>
          );
    }

    return (
      <div className={cardClasses}>
        <div className="RecipeCard-container">
          {recipePanel}

          <RecipePageLink
            externalUrl={externalUrl}
            id={id}
            recommendation={recommendationType}
            viewSource={viewSource}
            edit={pendingExternal}
          >
            <div className="RecipeCard-image-container">
              {lazyImage}
            </div>
          </RecipePageLink>

          {pendingExternal && (
            <a href={sourceUrl} target="_blank">
              <Button
                outline
                size="small"
                className="RecipeCard-cornerButton"
              >
                View on {publisher.displayName}
              </Button>
            </a>
          )}

          <div className="RecipeCard-content">
            <div className="RecipeCard-title">
              <RecipePageLink
                externalUrl={externalUrl}
                id={id}
                recommendation={recommendationType}
                viewSource={viewSource}
                edit={pendingExternal}
              >
                {name}
              </RecipePageLink>
            </div>

            {subtitle}

            <CollectionsPopup openDelay={isSaved ? 0 : 500} recipe={recipe}>
              <div className="RecipeCard-like">
                <div className={selectButtonClass}>
                </div>
              </div>
            </CollectionsPopup>
          </div>
        </div>
      </div>
    );
  }
}

RecipePageLink.propTypes = {
  children: PropTypes.node.isRequired,
  externalUrl: PropTypes.string,
  id: PropTypes.string,
  recommendation: PropTypes.string,
  viewSource: PropTypes.string,
  edit: PropTypes.bool,
};

RecipeCard.propTypes = {
  alternative: PropTypes.bool,

  recipe: PropTypes.shape({
    id: PropTypes.any,
    externalUrl: PropTypes.string,
    userId: PropTypes.string,
    isRemoved: PropTypes.bool,

    cookbook: PropTypes.shape({
      saved: PropTypes.bool,
    }),

    data: PropTypes.shape({
      image: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
      name: PropTypes.string.isRequired,
      publisher: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
      }),
    }).isRequired,

    tile: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }),

    user: PropTypes.shape({
      cookbookVisibility: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,

  viewSource: PropTypes.string,
  uid: PropTypes.string,
};

export default RecipeCard;
