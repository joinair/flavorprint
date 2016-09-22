
import React, { PropTypes } from 'react';
import classnames from 'classnames';

const TabPanel = ({ children, className }) => (
  <div className={classnames('TabPanel', className)}>
    {children}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default TabPanel;
