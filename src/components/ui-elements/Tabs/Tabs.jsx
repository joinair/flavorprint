
import React, { Component, PropTypes, cloneElement } from 'react';

import classnames from 'classnames';
import map from 'lodash/map';
import bind from 'lodash/bind';
import head from 'lodash/head';
import tail from 'lodash/tail';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import isPlainObject from 'lodash/isPlainObject';

const isTabDisabled = tab => tab.props.disabled;
const isTabSelected = tab => tab.props.selected;
const tabName = tab => tab.props.name;
const isPanelHasName = name => panel => panel.props.name === name;

class Tabs extends Component {
  getChildren() {
    const { children } = this.props;

    if (isEmpty(children)) return undefined;
    if (isPlainObject(children)) return this.prepareTabList(children);

    const tabList = this.prepareTabList(head(children));
    const selectedTab = find(tabList.props.children, isTabSelected);

    if (selectedTab) {
      const selectedPanel = find(tail(children), isPanelHasName(tabName(selectedTab)));
      return [tabList, selectedPanel];
    }

    return tabList;
  }
  prepareTabList(tabList) {
    return cloneElement(tabList, {
      children: map(tabList.props.children, (tab, index) =>
        cloneElement(tab, {
          key: index,
          onClick: bind(this.handleTabClick, this, tab),
        })
      ),
      key: 'tabList',
    });
  }
  handleTabClick(tab) {
    if (isTabDisabled(tab) || isTabSelected(tab)) {
      return undefined;
    }

    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(tabName(tab));
    }
  }
  render() {
    const { className } = this.props;

    return (
      <div className={classnames('Tabs', className)}>
        {this.getChildren()}
      </div>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  onSelect: PropTypes.func,
};

export default Tabs;
