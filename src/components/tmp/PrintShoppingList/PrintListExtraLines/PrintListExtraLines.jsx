
import React, { PropTypes } from 'react';

import times from 'lodash/times';

import classnames from 'classnames';

import './PrintListExtraLines.css';

const PrintListExtraLines = ({ isExtraLinesVisible }) => {
  const extraLines = times(8, index =>
    <li key={index} className="PrintListGroup-item PrintListExtraLines-item">
      &nbsp;
    </li>
  );

  return (
    <li
      className={classnames(
        'PrintListGroup PrintListExtraLines',
        { 'is-extraLinesVisible': isExtraLinesVisible }
      )}
    >
      <ul className="PrintListGroup-wrap">
        <li>
          <div className="PrintListGroup-heading">
            <h4>Need Anything Else?</h4>
          </div>
        </li>
        {extraLines}
      </ul>
    </li>
  );
};

PrintListExtraLines.propTypes = {
  isExtraLinesVisible: PropTypes.bool.isRequired,
};

export default PrintListExtraLines;
