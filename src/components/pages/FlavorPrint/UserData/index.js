
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import selectors from 'reducers/selectors';

import UserData from './UserData';

const selector = createStructuredSelector({
  mark: selectors.userMarkSelector,
});

export default connect(selector)(UserData);
