
import isArray from 'lodash/isArray';

export default data => isArray(data) ? data : [data];
