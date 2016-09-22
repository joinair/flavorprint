
import assign from 'lodash/assign';

import initialLoad from 'helpers/initialLoad';

import { SIGN_UP } from 'constants/Routes';
import { REDIRECT_PATH } from 'constants/QueryParams';

export default store => (nextState, replace) => {
  if (!initialLoad() &&
      !store.getState().user.isAuthenticated) {
    const { query } = nextState.location;

    replace({
      pathname: SIGN_UP,
      query: assign({ [REDIRECT_PATH]: nextState.location.pathname }, query),
      toplevel: true,
    });

    return true;
  }
};
