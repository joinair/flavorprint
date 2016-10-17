
import React, { PropTypes } from 'react';

import './styles.css';

const Content = ({ children }) => (
  <div className="FlavorPrintContent">
    {children}
  </div>
);

Content.propTypes = {
  children: PropTypes.node,
};

export default Content;
