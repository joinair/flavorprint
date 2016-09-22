
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import assign from 'lodash/assign';
import bind from 'lodash/bind';
import get from 'lodash/get';
import noop from 'lodash/noop';
import partial from 'lodash/partial';

import Rx from 'rx';

import { on, off } from 'helpers/event';

import Popup from './Popup';

const OPEN = 'OPEN';
const CLOSE = 'CLOSE';
const REMOVE = 'REMOVE';

export const ServerSidePlaceholder = ({ children }) =>
  <div>
    <span>{children}</span>
    <span />
  </div>;

class CollectionsPopup extends Component {
  constructor(props) {
    super(props);

    this.events$ = new Rx.Subject();

    this.addEvent = bind(this.addEvent, this);
    this.handleDocumentClick = bind(this.handleDocumentClick, this);

    this.state = { popup: REMOVE };
  }

  componentDidMount() {
    on(document, 'click', this.handleDocumentClick, true);

    let latestEvent = Date.now();

    const immediate$ = this.events$.filter(({ delay }) => !delay);
    const delayed$ = this.events$
      .filter(({ delay }) => delay)
      .flatMap(event => Rx.Observable.of(event).delay(event.delay));

    const onEvent = ({ type }) => {
      const state = this.state.popup === REMOVE && type === CLOSE
        ? REMOVE
        : type;

      if (this.state.popup !== state) {
        this.setState({ popup: state });
      }

      if (state === CLOSE) {
        setTimeout(partial(this.addEvent, REMOVE, 300), 0);
      }
    };

    immediate$.merge(delayed$)
      .filter(({ createdAt }) => createdAt > latestEvent)
      .tap(({ createdAt }) => { latestEvent = createdAt; })
      .subscribe(onEvent, noop);

    if (this.props.openByDefault) { this.addEvent(OPEN, null); }
  }

  componentWillUnmount() {
    off(document, 'click', this.handleDocumentClick, true);
    this.events$.onCompleted();
  }

  addEvent(type, delay) {
    const createdAt = Date.now();
    this.events$.onNext({ type, delay, createdAt });
  }

  handleDocumentClick(event) {
    if (!findDOMNode(this).contains(event.target) && this.state.popup === OPEN) {
      this.addEvent(CLOSE);
    }
  }

  render() {
    const { popup } = this.state;

    const onMouseEnter = popup === OPEN
      ? partial(this.addEvent, OPEN, null)
      : undefined;

    const onMouseLeave = popup === OPEN
      ? partial(this.addEvent, CLOSE, 2500)
      : undefined;

    const { children, className, recipe, openDelay, onSelect } = this.props;
    const isSaved = get(recipe, 'cookbook.saved');

    const triggerEvents = assign(
      {
        onClick: () => {
          if (!isSaved) { setTimeout(partial(onSelect, recipe), 0); }
          this.addEvent(OPEN, openDelay);
        },
      },
      popup === OPEN ? { onMouseEnter, onMouseLeave } : {}
    );

    return (
      <div>
        <span ref="trigger" {...triggerEvents}>
          {children}
        </span>

        <span ref="popup">
          {popup !== REMOVE &&
            <Popup
              className={className}
              recipe={recipe}
              visible={popup === OPEN}
              onClose={partial(this.addEvent, CLOSE, false)}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          }
        </span>
      </div>
    );
  }
}

ServerSidePlaceholder.propTypes = {
  children: PropTypes.node.isRequired,
};

CollectionsPopup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  openByDefault: PropTypes.bool,
  openDelay: PropTypes.number,
  recipe: PropTypes.shape({
    cookbook: PropTypes.shape({
      saved: PropTypes.bool,
    }),
  }),
  onSelect: PropTypes.func.isRequired,
};

export default CollectionsPopup;
