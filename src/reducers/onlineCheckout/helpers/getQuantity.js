
import get from 'lodash/get';

export default object => get(object, 'qty.value', 1);
