/* eslint react/prefer-stateless-function:0 */

import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';

import classnames from 'classnames';

import getSummaryPrice from 'reducers/onlineCheckout/helpers/getSummaryPrice';

import getCustomErrorDescription from 'helpers/getCustomErrorDescription';

import iconClose from 'assets/images/icons/icon-close.svg';
import iconLogo from 'assets/images/icons/whisk-logo.svg';
import './styles.css';

import Button from 'components/ui-elements/Button';
import Icon from 'components/ui-elements/Icon';
import Input from 'components/ui-elements/Input';

import OnlineCheckoutSendItems from 'components/pages/OnlineCheckout/SendItems';
import OnlineCheckoutViewSelector from 'components/pages/OnlineCheckout/ViewSelector';

class HeaderPeapod extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showChangeZip: false,
      zip: '',
      error: null,
    };

    this.changeZipToggle = bind(this.changeZipToggle, this);
    this.onZipChange = bind(this.onZipChange, this);
    this.saveZipCode = bind(this.saveZipCode, this);
  }

  onZipChange(zip) {
    this.setState({ zip });
  }

  changeZipToggle() {
    const { showChangeZip } = this.state;
    this.setState({
      showChangeZip: !showChangeZip,
      zip: '',
      error: null,
    });
  }

  saveZipCode() {
    if (!this.props.peapod.isValid) return;

    const { onZipChange } = this.props;
    const { zip } = this.state;

    onZipChange(zip).subscribe(data => {
      if (data.response.length <= 0) {
        this.setState({ error: 'zip.noStores' });
      } else {
        this.setState({ showChangeZip: false });
      }
    }, () => {
      this.setState({ error: 'zip.invalid' });
    });
  }

  render() {
    const {
      inventory, entries, items, isFetching,
      onClose, onLogoClick, onSend, onInventorySelect,
      peapod,
    } = this.props;

    const {
      showChangeZip,
      zip,
    } = this.state;

    const error = getCustomErrorDescription('peapod', 'zip', {
      code: this.state.error,
      desc: this.state.error,
    });

    return (
      <div className="OnlineCheckoutHeader">
        <div className="OnlineCheckoutHeader-area OnlineCheckoutHeader-area--single">
          <div className="OnlineCheckoutHeader-logoAndSelector">
            <div
              className="OnlineCheckoutHeader-logo OnlineCheckoutHeader-logo--permanent"
              onClick={onLogoClick}
            >
              <Icon
                glyph={iconLogo}
                style={{ height: 30, width: 83 }}
              />
            </div>
            <div className="OnlineCheckoutHeader-logoAndSelector-space" />

            <OnlineCheckoutViewSelector />
          </div>

          <div className="OnlineCheckoutHeader-mobileSpace" />

          <div
            className={classnames({
              'OnlineCheckoutHeader-spaceAndButton': true,
              'OnlineCheckoutHeader-spaceAndButton--withError': showChangeZip && error,
            })}
          >
            <div className="OnlineCheckoutHeader-spaceAndButton-space">
              <div className="OnlineCheckoutHeader-zone">
                <div className="OnlineCheckoutHeader-zone-text">
                  Your branch is <b>{peapod.config.city}</b>.
                </div>
                <div className="OnlineCheckoutHeader-zone-link">
                  <a onClick={this.changeZipToggle}>Change</a>
                </div>
              </div>
            </div>

            <div className="OnlineCheckoutHeader-spaceAndButton-delimiter" />

            <div className="OnlineCheckoutHeader-sendAndClose">
              <div className="OnlineCheckoutHeader-send OnlineCheckoutHeader-sendAndClose-send">
                <OnlineCheckoutSendItems
                  entries={entries}
                  inventory={inventory}
                  price={isFetching ? null : getSummaryPrice(items)}
                  onInventorySelect={onInventorySelect}
                  onSend={onSend}
                />
              </div>
              <div
                className="
                  OnlineCheckoutHeader-close
                  OnlineCheckoutHeader-close--mobile
                  OnlineCheckoutHeader-close--showOnXs
                "
              >
                <Button
                  color="grey"
                  icon={iconClose}
                  iconStyle={{ height: 14, width: 14 }}
                  onClick={onClose}
                />
              </div>
            </div>

            {showChangeZip && (
              <div className="OnlineCheckoutHeader-changeZip">
                <div className="OnlineCheckoutHeader-changeZip-content">
                  <Input
                    className="OnlineCheckoutHeader-changeZip-input"
                    size="small"
                    placeholder="Enter your zip code"
                    value={zip}
                    error={error}
                    onChange={this.onZipChange}
                    onSubmit={this.saveZipCode}
                  />
                  <div className="OnlineCheckoutHeader-changeZip-controls">
                    <Button
                      disabled={!peapod.isValid}
                      onClick={this.saveZipCode}
                    >
                      Save
                    </Button>
                    <Button
                      disabled={!peapod.isValid}
                      onClick={this.changeZipToggle}
                      color="grey"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="OnlineCheckoutHeader-close OnlineCheckoutHeader-close--desktop">
            <Button
              color="grey"
              icon={iconClose}
              iconStyle={{ height: 14, width: 14 }}
              onClick={onClose}
            >
              Close checkout
            </Button>
          </div>

          <div
            className="
              OnlineCheckoutHeader-close
              OnlineCheckoutHeader-close--mobile
              OnlineCheckoutHeader-close--hideOnXs
            "
          >
            <Button
              color="grey"
              icon={iconClose}
              iconStyle={{ height: 14, width: 14 }}
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    );
  }
}

HeaderPeapod.propTypes = {
  entries: PropTypes.array.isRequired,
  inventory: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onInventorySelect: PropTypes.func.isRequired,
  onLogoClick: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  onZipChange: PropTypes.func.isRequired,
  peapod: PropTypes.object.isRequired,
};

export default HeaderPeapod;
