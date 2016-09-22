
import filter from 'lodash/filter';
import some from 'lodash/some';
import split from 'lodash/split';

export const idToInventory = id => {
  const items = filter(split(id, ':'));
  const [region, name] = items;
  return (items.length > 2) ?
    { region, name, branch: items[2] } :
    { region, name };
};

export const inventoryToId = ({ region, name, branch }) =>
  filter([region, name, branch]).join(':');

export const hasInventory = (inventories, inventory) => {
  const { region, name } = inventory;
  return !!inventory && some(inventories, { inventory: { region, name } });
};

export default { idToInventory, inventoryToId, hasInventory };
