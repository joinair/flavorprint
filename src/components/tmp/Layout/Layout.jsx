/* eslint react/prefer-stateless-function: 0 */

import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';

import './styles.css';

import SidebarMenu from './SidebarMenu';
import ShoppingListSidebar from './ShoppingListSidebar';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import NotFound from './NotFound';
import BodyClassName from 'components/ui-elements/BodyClassName';
import Sticky from 'components/ui-elements/Sticky';
import CompleteProfile from 'components/banners/CompleteProfile';
import Modal from 'components/tmp/Modal';
import Notification from 'components/tmp/Notification';

class Layout extends Component {
  render() {
    const {
      children,
      isNotFound,
      isSidebarMenuOpened,
      isShoppingListOpened,
    } = this.props;

    const anySidebarsOpened = isSidebarMenuOpened || isShoppingListOpened;

    return (
      <BodyClassName className="Body">
        <div className="page-wrapper">
          <SidebarMenu />
          <ShoppingListSidebar />

          <div className={classnames({ 'u-overlay': anySidebarsOpened })}>
            <div className="LayoutFlex">
              <div className="LayoutFlex-inner">
                <Sticky scrollHeight={1}>
                  <AppHeader />
                </Sticky>

                <div className="LayoutFlex-main">
                  {isNotFound ? <NotFound /> : children}
                </div>

                <AppFooter />
              </div>
            </div>
          </div>

          <Modal />
          <Notification autoDismiss={10000} />

          <CompleteProfile />
        </div>
      </BodyClassName>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.any,
  isNotFound: PropTypes.bool.isRequired,
  isSidebarMenuOpened: PropTypes.bool.isRequired,
  isShoppingListOpened: PropTypes.bool.isRequired,
};

export default Layout;
