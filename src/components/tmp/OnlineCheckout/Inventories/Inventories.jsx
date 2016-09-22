
import React, { PropTypes } from 'react';

import classnames from 'classnames';
import map from 'lodash/map';
import partial from 'lodash/partial';

import CloudinaryImage from 'components/ui-elements/CloudinaryImage';

const Inventories = ({ active, inventories, onInventoryChange }) => {
  const isActive = inventory =>
    inventory.name === active.name &&
    inventory.region === active.region;

  const content = map(inventories, ({ inventory, image }) => {
    const key = `${inventory.region}:${inventory.name}`;

    return (
      <CloudinaryImage
        className={
          classnames(
            'OnlineCheckoutInventory',
            { 'is-active': isActive(inventory) }
          )
        }
        key={key}
        url={image}
        title={inventory.name}
        transformation="c_fill,h_30,f_auto"
        onClick={partial(onInventoryChange, key)}
      />
    );
  });

  return <div>{content}</div>;
};

const TInventory = PropTypes.shape({
  name: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
}).isRequired;

Inventories.propTypes = {
  active: TInventory,
  inventories: PropTypes.arrayOf(PropTypes.shape({
    inventory: TInventory,
    image: PropTypes.string.isRequired,
  })).isRequired,
  onInventoryChange: PropTypes.func.isRequired,
};

export default Inventories;
