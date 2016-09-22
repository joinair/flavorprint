
import merge from 'lodash/merge';

import replaceItem from 'reducers/onlineCheckout/helpers/replaceItem';

export default revert => (state, action) =>
  replaceItem(
    state,
    action,
    item => {
      const quantity = item.siDecision.qty.value;
      const nextQuantity = revert
        ? quantity - action.payload.quantityDelta
        : quantity + action.payload.quantityDelta;

      return merge(
        {},
        item,
        { siDecision: { qty: { value: nextQuantity } } }
      );
    }
  );
