
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import feed from 'actions/feed';
import search from 'actions/search';

import SearchQuery from './SearchQuery';

const actions = (outerDispatch, props) => bindActionCreators({
  onTermSearch: term => dispatch => {
    dispatch(feed.clean());
    return dispatch(search.searchTerm(props.route, props.routerActions, term));
  },
}, outerDispatch);

export default connect(null, actions)(SearchQuery);
