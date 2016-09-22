
import React, { Component, PropTypes } from 'react';
import TextTruncate from 'react-text-truncate';

import classnames from 'classnames';
import bind from 'lodash/bind';

import formatPrice from 'helpers/formatPrice';

import './styles.css';

import CloudinaryImage from 'components/ui-elements/CloudinaryImage';

class FindAlternativesOption extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = bind(this.handleSelect, this);
  }

  handleSelect(event) {
    if (event.target !== this.refs.link) {
      this.props.onSelect();
    }
  }

  render() {
    const { option, selected, isTizen, isTizenFridge } = this.props;

    const price = option.item.price || 0;
    const currency = option.item.currency;
    const formattedPrice = formatPrice(price, currency);

    const rootClasses = classnames('FindAlternativesOption', {
      'is-selected': selected,
    });

    const name = isTizen
      ? option.item.name
      : <TextTruncate line={3} text={option.item.name} />;

    return (
      <div className={rootClasses}>
        <div
          className="FindAlternativesOption-inner"
          onClick={this.handleSelect}
        >
          <div className="FindAlternativesOption-imageContainer">
            <CloudinaryImage
              className="FindAlternativesOption-image"
              transformation="c_fill,w_120,h_120,f_auto"
              url={option.item.imageUrl}
            />
          </div>

          <div className="FindAlternativesOption-name">
            {name}
          </div>

          <div className="FindAlternativesOption-footer">
            {!isTizenFridge &&
              <a
                className="FindAlternativesOption-details"
                href={option.item.url}
                ref="link"
                target="_blank"
              >
                View details
              </a>
            }

            <span className="FindAlternativesOption-price">
              {formattedPrice.symbol}{formattedPrice.priceString}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

FindAlternativesOption.propTypes = {
  isTizen: PropTypes.bool,
  isTizenFridge: PropTypes.bool,
  option: PropTypes.shape({
    item: PropTypes.shape({
      currency: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default FindAlternativesOption;
