/* eslint react/prefer-stateless-function: 0 */

import React, { Component } from 'react';
import Helmet from 'react-helmet';

import ShoppingList from 'components/tmp/ShoppingList';
import BodyClassName from 'components/ui-elements/BodyClassName';

class ShoppingListPage extends Component {
  render() {
    return (
      <div>
        <BodyClassName className="Page--mobileShoppingList" />
        <Helmet title="Shopping list - Whisk" />
        <ShoppingList />
      </div>
    );
  }
}

export default ShoppingListPage;
