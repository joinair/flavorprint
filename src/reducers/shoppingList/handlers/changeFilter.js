
import assign from 'lodash/assign';

export default (state, action) =>
  assign({}, state, { sortBy: action.payload.filter });
