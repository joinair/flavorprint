
import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Tab = ({
  children,
  className,
  disabled,
  selected,

  onClick,
}) => (
  <li
    className={classnames(
      'Tab',
      {
        'is-disabled': disabled,
        'is-selected': selected,
      },
      className
    )}
    onClick={onClick}
  >
    {children}
  </li>
);

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

Tab.defaultProps = {
  selected: false,
};

export default Tab;
