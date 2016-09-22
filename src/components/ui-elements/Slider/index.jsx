
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import classnames from 'classnames';

import bind from 'lodash/bind';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import minBy from 'lodash/minBy';

import { on, off } from 'helpers/event';

import './styles.css';

const getMouseX = (event) => {
  if (event.touches) {
    const touch = event.touches[0];
    return get(touch, 'pageX');
  }

  if (!('pageX' in event) && 'clientX' in event) {
    const eventDoc = event.target && event.target.ownerDocument || document;
    const doc = eventDoc.documentElement;
    const body = eventDoc.body;

    return event.clientX +
      (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        (doc && doc.clientLeft || body && body.clientLeft || 0);
  }
  const { pageX } = event;
  return pageX;
};

class Slider extends Component {
  constructor(props) {
    super(props);
    this.mouseDown = bind(this.mouseDown, this);
    this.mouseUp = bind(this.mouseUp, this);
    this.mouseMove = bind(this.mouseMove, this);
    this.touchMove = bind(this.touchMove, this);

    this.state = { isMoving: false, value: props.value };
  }

  componentDidMount() {
    on(document, 'mouseup', this.mouseUp);
    on(document, 'touchend', this.mouseUp);
    on(document, 'mousemove', this.mouseMove);
    on(document, 'touchmove', this.touchMove);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ value: newProps.value });
  }

  componentWillUnmount() {
    off(document, 'mouseup', this.mouseUp);
    off(document, 'touchend', this.mouseUp);
    off(document, 'mousemove', this.mouseMove);
    off(document, 'touchmove', this.touchMove);
  }

  setValue(value) {
    const max = Math.max(value, 0);
    const min = Math.min(max, 100);
    if (this.props.descreteSteps) {
      this.setDescrete(min);
    } else {
      const newValue = Math.round(min);
      this.setState({ value: newValue });
      this.sendOnChange(newValue);
    }
  }

  setDescrete(offset) {
    const { descreteSteps } = this.props;
    const { value } = this.state;
    const descreteValue = +minBy(descreteSteps, step => Math.abs(step - offset));

    if (value !== descreteValue) {
      this.setState({ value: descreteValue });
      this.sendOnChange(descreteValue);
    }
  }

  sendRelease() {
    const { onRelease } = this.props;
    if (isFunction(onRelease)) {
      onRelease();
    }
  }

  sendOnChange(value) {
    const { onChange } = this.props;
    onChange(value);
  }

  mouseDown(e) {
    this.setState({ isMoving: true });
    this.handleThumbPos(getMouseX(e));
  }

  mouseUp() {
    const { isMoving } = this.state;
    this.setState({ isMoving: false });
    if (isMoving) {
      this.sendRelease();
    }
  }

  touchMove(e) {
    if (this.state.isMoving) {
      const touch = e.touches[0];
      if (touch) {
        this.handleThumbPos(touch.pageX);
      }
      e.preventDefault();
    }
  }

  mouseMove(e) {
    if (this.state.isMoving) {
      this.handleThumbPos(getMouseX(e));
      e.preventDefault();
    }
  }

  handleThumbPos(x) {
    const line = findDOMNode(this.refs.line);
    const posX = line.offsetLeft;
    const width = line.offsetWidth;
    const value = 100 * (x - posX) / width;
    this.setValue(value);
  }

  render() {
    const { value, isMoving } = this.state;
    const perc = `${Math.round(value)}%`;
    const fillStyle = { width: perc };
    const thumbStyle = { left: perc };
    const descrete = !!this.props.descreteSteps;

    return (
      <div
        className="Slider"
        onMouseDown={this.mouseDown}
        onTouchStart={this.mouseDown}
      >
        <div ref="line" className="Slider-line">
          <div
            style={fillStyle}
            className={classnames({
              'Slider-line-fill': true,
              'Slider-line-fill--descrete': descrete,
            })}
          />
          <div
            style={thumbStyle}
            className={classnames({
              'Slider-line-thumb': true,
              'Slider-line-thumb--descrete': descrete,
              'Slider-line-thumb--pressed': isMoving,
            })}
          />
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  descreteSteps: PropTypes.array,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onRelease: PropTypes.func,
};

export default Slider;
