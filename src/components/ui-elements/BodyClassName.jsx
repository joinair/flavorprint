
import { Children, Component, PropTypes } from 'react';
import withSideEffect from 'react-side-effect';

import join from 'lodash/join';
import uniq from 'lodash/uniq';

class BodyClassName extends Component {
  render() {
    if (this.props.children) {
      return Children.only(this.props.children);
    }

    return null;
  }
}

BodyClassName.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string.isRequired,
};

const reducePropsToState = propsList =>
  join(uniq(propsList.map(props => props.className)), ' ');

const handleStateChangeOnClient = classNames => {
  document.body.className = classNames || '';
};

export default withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(BodyClassName);
