
import mixpanel from 'analytics/mixpanel';

import get from 'lodash/get';
import find from 'lodash/find';

import { FIND_ALTERNATIVES } from 'constants/Modals';

import { ROUTER_DID_CHANGE } from 'actions/router';

const handler = state => {
  const itemId = get(state.modal, 'payload.itemId');
  const item = find(state.onlineCheckout.items, { id: itemId });

  if (!item) { return; }

  mixpanel.track('Online Checkout Alternative Search', state, {
    'Item Text': get(item, 'key.text'),
    'Product Text': get(item, 'siDecision.item.name'),
  });
};

export default ({ state, action }) => {
  if (action.type === ROUTER_DID_CHANGE &&
      state.modal.type === FIND_ALTERNATIVES) {
    handler(state);
  }
};
