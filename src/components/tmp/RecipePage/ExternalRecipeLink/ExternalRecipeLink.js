
import React, { PropTypes } from 'react';

const ExternalRecipeLink = ({ children, className, href, notifyAnalytics }) =>
  <a
    className={className}
    href={href}
    target="_blank"
    onClick={notifyAnalytics}
  >
    {children}
  </a>;

ExternalRecipeLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  notifyAnalytics: PropTypes.func.isRequired,
};

export default ExternalRecipeLink;
