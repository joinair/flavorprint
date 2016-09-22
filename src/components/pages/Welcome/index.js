
import { connect } from 'react-redux';

import { topLevelReplace } from 'actions/navigator';

import { NOT_NEW_USER } from 'constants/LocalStorageKeys';
import { SIGN_UP } from 'constants/Routes';

import storage from 'helpers/storage';

import Welcome from './Welcome';

const actions = {
  onComplete: () => {
    storage.set(NOT_NEW_USER, 'true');
    return topLevelReplace({ path: SIGN_UP });
  },
};

export default connect(null, actions)(Welcome);
