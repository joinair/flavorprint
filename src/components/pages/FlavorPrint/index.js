
import React, { PropTypes } from 'react';

import UserData from './UserData';
import StaticContent from './StaticContent';

import './styles.css';

const FlavorPrint = () => (
  <div className="FlavorPrint">
    <UserData />
    <StaticContent />
  </div>
);

export default FlavorPrint;
