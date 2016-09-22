
import React, { Component, PropTypes } from 'react';

import './styles.css';

import SendingItems from './SendingItems';
import Complete from './Complete';

const SENDING_ITEMS = 'SENDING_ITEMS';
const COMPLETE = 'COMPLETE';

class CheckoutProcess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentState: SENDING_ITEMS,
      data: null,
    };
  }

  componentDidMount() {
    const { inventory, onSend, onSendFailure } = this.props;

    const onSuccess = data => {
      this.setState({ data, currentState: COMPLETE });
    };

    onSend(inventory).subscribe(onSuccess, onSendFailure);
  }

  render() {
    const { inventory, onBack } = this.props;
    const { currentState, data } = this.state;

    return (
      <div className="CheckoutProcessModal">
        <div className="CheckoutProcessModal-inner">
          {currentState === SENDING_ITEMS &&
            <SendingItems inventory={inventory} />
          }

          {currentState === COMPLETE &&
            <Complete data={data} onBack={onBack} />
          }
        </div>
      </div>
    );
  }
}

CheckoutProcess.propTypes = {
  inventory: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  onSendFailure: PropTypes.func.isRequired,
};

export default CheckoutProcess;
