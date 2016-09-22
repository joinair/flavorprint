
import React, { PropTypes, Component, cloneElement } from 'react';

import bind from 'lodash/bind';

import { on, off } from 'helpers/event';

const getScrollTop = () => {
  const supportPageOffset = window.pageXOffset !== undefined;
  const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');

  if (supportPageOffset) {
    return window.pageYOffset;
  }

  return isCSS1Compat
    ? document.documentElement.scrollTop
    : document.body.scrollTop;
};

class Sticky extends Component {
  constructor(props) {
    super(props);

    this.handleScroll = bind(this.handleScroll, this);
    this.state = { sticky: false };
  }

  componentDidMount() {
    this.handleScroll();
    on(window, 'scroll', this.handleScroll);
  }

  componentWillUnmount() {
    off(window, 'scroll', this.handleScroll);
  }

  handleScroll() {
    const scrollTop = getScrollTop();
    const scrollHeight = typeof this.props.scrollHeight === 'function'
      ? this.props.scrollHeight()
      : this.props.scrollHeight;

    if (typeof scrollHeight !== 'number') { return undefined; }

    if (scrollTop >= scrollHeight && !this.state.sticky) {
      this.setState({ sticky: true });
    } else if (scrollTop < scrollHeight && this.state.sticky) {
      this.setState({ sticky: false });
    }
  }

  render() {
    return (
      <div>
        {cloneElement(this.props.children, { sticky: this.state.sticky })}
      </div>
    );
  }
}

Sticky.propTypes = {
  children: PropTypes.node.isRequired,
  scrollHeight: PropTypes.oneOfType([
    PropTypes.number, PropTypes.func,
  ]).isRequired,
};

export default Sticky;
