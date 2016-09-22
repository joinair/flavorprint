
import React, { PropTypes } from 'react';

import PrintShoppingListActions from 'components/tmp/PrintShoppingList/PrintShoppingListActions';

const PrintHeader = ({ onPrint }) =>
  <div className="PrintHeader">
    <PrintShoppingListActions />

    <button className="PrintHeader-printButton" onClick={onPrint}>
      Print
    </button>
  </div>;

PrintHeader.propTypes = {
  onPrint: PropTypes.func.isRequired,
};

export default PrintHeader;
