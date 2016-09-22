
import React, { PropTypes } from 'react';

import './styles.css';

const ModalBody = ({ children }) => (
  <div className="ModalBody">
    {children}
  </div>
);

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalBody;
