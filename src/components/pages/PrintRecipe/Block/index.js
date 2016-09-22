
import React, { PropTypes } from 'react';

import './styles.css';

const PrintRecipeBlock = ({ title, children }) => (
  <div className="PrintRecipeBlock">
    <h3 className="PrintRecipeBlock-title">{title}</h3>

    <div className="PrintRecipeBlock-content">
      {children}
    </div>
  </div>
);

PrintRecipeBlock.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default PrintRecipeBlock;
