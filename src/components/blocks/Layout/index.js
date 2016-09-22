
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import keys from 'lodash/keys';

import Layout from './Layout';

import { MOBILE_SHOPPING_LIST } from 'constants/Routes';
import { open, close } from 'actions/shoppingListSidebar';

const actions = (dispatch, props) => ({
  onTabSwitch: tab => dispatch((innerDispatch, getState) => {
    const { shoppingListSidebar } = getState();

    if (tab === MOBILE_SHOPPING_LIST) {
      if (!shoppingListSidebar.isOpen) innerDispatch(open());
    } else if (shoppingListSidebar.isOpen) {
      innerDispatch(close());
    }

    props.routerActions.replace(tab);
  }),

  onTabPush: tab => props.routerActions.push(tab),
});

const selector = createStructuredSelector({
  notFound: state => state.notFound,
  selectedTab: (s, props) => props.route.path,
  shoppingListItemsCount: state => keys(state.shoppingList.items).length,
  shoppingListLastSource: state => state.shoppingList.lastSource,
});

export default connect(selector, actions)(Layout);
