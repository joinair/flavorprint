
import assign from 'lodash/assign';

export default lastSource => state => assign({}, state, { lastSource });
