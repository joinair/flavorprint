/* eslint react/prefer-stateless-function: 0 */

import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';

import GroupByCategories from './GroupByCategories';
import GroupByRecipes from './GroupByRecipes';
import PrintListKey from './PrintListKey';

import ShoppingListFilters from 'constants/ShoppingListFilters';

import PrintHeader from './PrintHeader';
import iconLogo from 'assets/images/icons/whisk-logo.svg';

import './styles.css';

import Icon from 'components/ui-elements/Icon';

const PrintedPageHeader = () =>
  <div className="PrintHalfWrap">
    <div className="PrintHalfWrap-printHalf">
      <div className="PrintHalfWrap-printHeader">
        <Icon className="PrintHalfWrap-logo" glyph={iconLogo} />

        <div className="PrintHalfWrap-printHeader-listName">
          <span className="PrintHalfWrap-printHeader-listTitle">
            <strong>Shopping list</strong> - 19 January 2016
          </span>
          <p><small>Created with Whisk.com</small></p>
        </div>
      </div>
    </div>
    <div className="PrintHalfWrap-printHalf PrintHalfWrap-bannerAd">

    </div>
  </div>;

const PrintMoreInfo = () =>
  <div className="PrintHalfWrap-printHalf PrintHalfWrap-printBottom">
    <div className="PrintMoreInfo PrintMoreInfo--largeIcon">
      <img
        alt=""
        className="PrintMoreInfo-icon"
        src="/assets/images/print-sl/icon-folded-paper.png"
      />
      <p><strong>Did you know?</strong> You can fold this list so it's perfect to take with you.</p>
    </div>

    <div className="PrintMoreInfo">
      <img
        alt=""
        className="PrintMoreInfo-icon"
        src="/assets/images/print-sl/icon-bulb.png"
      />
      <p><strong>Food fact:</strong> Ripe cranberries will bounce like rubber balls.</p>
    </div>
  </div>;

class PrintShoppingList extends Component {
  render() {
    const {
      isFontSizeLarge,
      view,
      recipes,
    } = this.props;

    const groupedItems = view === ShoppingListFilters.RECIPE
      ? <GroupByRecipes />
      : <GroupByCategories />;

    return (
      <div className="print-shopping-list">
        <PrintHeader />

        <div className="checklist_main">
          <div
            className={classnames(
              'PrintPreview',
              { FontLarge: isFontSizeLarge }
            )}
          >
            <PrintedPageHeader />

            <div className="PrintChecklistColumns">
              {groupedItems}

              <PrintListKey recipes={recipes} />

              <div className="PrintPageSeparator"></div>
            </div>

            <div className="PrintHalfWrap PrintFooter">
              <PrintMoreInfo />

              <div className="PrintHalfWrap-printHalf">
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

PrintShoppingList.propTypes = {
  isFontSizeLarge: PropTypes.bool.isRequired,
  view: PropTypes.string.isRequired,
  recipes: PropTypes.object.isRequired,
};

export default PrintShoppingList;
