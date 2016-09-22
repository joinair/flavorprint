
import React, { PropTypes } from 'react';

import iconPrint from 'assets/images/icons/icon-print.svg';

import Button from 'components/ui-elements/Button';

const PrintButton = ({ onPrint }) =>
  <Button
    color="grey"
    icon={iconPrint}
    iconStyle={{ height: '18px', width: '20px' }}
    outline
    onClick={onPrint}
  >
    Print recipe
  </Button>;

PrintButton.propTypes = {
  onPrint: PropTypes.func.isRequired,
};

export default PrintButton;
