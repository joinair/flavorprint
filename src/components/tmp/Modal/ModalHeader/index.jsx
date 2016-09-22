
import React, { PropTypes } from 'react';

import classnames from 'classnames';

import iconClose from 'assets/images/icons/icon-close.svg';
import './styles.css';

import Icon from 'components/ui-elements/Icon';

const ModalHeader = ({
  className, closeButton, mobile, title,
  beforeTitle, afterTitle, onHide,
}) => {
  const headerClasses = classnames(
    'ModalHeader',
    { 'ModalHeader--mobile': mobile },
    className
  );

  return (
    <div className={headerClasses}>
      <div className="ModalHeader-container">
        {closeButton &&
          <div className="ModalHeader-close" onClick={onHide}>
            <Icon
              glyph={iconClose}
              style={{ height: 11, width: 11 }}
            />
          </div>
        }
        {beforeTitle}
        <div className="ModalHeader-title">
          {title}
        </div>
        {afterTitle}
      </div>
    </div>
  );
};

ModalHeader.propTypes = {
  afterTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  beforeTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
  closeButton: PropTypes.bool,
  mobile: PropTypes.bool,
  title: PropTypes.string,
  onHide: PropTypes.func,
};

ModalHeader.defaultProps = {
  closeButton: true,
  mobile: false,
};

export default ModalHeader;
