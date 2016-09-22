
import React, { PropTypes } from 'react';

import classnames from 'classnames';
import get from 'lodash/get';
import map from 'lodash/map';
import partial from 'lodash/partial';

import './styles.css';

import Button from 'components/ui-elements/Button';
import Preloader from 'components/ui-elements/Preloader';
import FindAlternativesOption from 'components/modals/FindAlternatives/Option';

const FindAlternativesOptions = ({
  item, options, hasMore, isLoading,
  onClose, onLoadMore, onOptionSelect,
}) => {
  const listItems = map(options, option => {
    const selected = get(item, 'siDecision.item.sku') === option.item.sku;

    return (
      <FindAlternativesOption
        option={option}
        selected={selected}
        key={option.item.sku}
        onSelect={selected ? onClose : partial(onOptionSelect, option)}
      />
    );
  });

  const isEmpty = options.length === 0;
  const listClasses = classnames('FindAlternativesOptions-list', {
    'FindAlternativesOptions-list--empty': isEmpty,
  });

  return (
    <div className="FindAlternativesOptions">
      <div className={listClasses}>
        {listItems}

        {isEmpty && !isLoading &&
          <div className="FindAlternativesOptions-message">
            Sorry, no results found.<br />
            Try searching for something else.
          </div>
        }

        {isEmpty && isLoading &&
          <div className="FindAlternativesOptions-message">
            <Preloader className="FindAlternativesOptions-preloader" />
          </div>
        }
      </div>

      {hasMore &&
        <div className="FindAlternativesOptions-showMore">
          {isLoading && !isEmpty
            ? (
              <Preloader className="FindAlternativesOptions-preloader" />
            ) : (
              <Button
                className="FindAlternativesOptions-button"
                onClick={onLoadMore}
              >
                Show more
              </Button>
            )
          }
        </div>
      }
    </div>
  );
};

FindAlternativesOptions.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  item: PropTypes.shape({}).isRequired,
  options: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onOptionSelect: PropTypes.func.isRequired,
};

export default FindAlternativesOptions;
