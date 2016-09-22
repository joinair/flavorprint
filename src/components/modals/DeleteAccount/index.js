
import { connect } from 'react-redux';

import user from 'actions/user';

import DeleteAccount from './DeleteAccount';

const actions = {
  onDelete: user.destroy,
};

export default connect(null, actions)(DeleteAccount);
