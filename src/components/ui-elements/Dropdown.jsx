
import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';

import bind from 'lodash/bind';
import classnames from 'classnames';
import find from 'lodash/find';
import get from 'lodash/get';
import head from 'lodash/head';
import map from 'lodash/map';
import partial from 'lodash/partial';

import { on, off } from 'helpers/event';

import iconArrowDown from 'assets/images/icons/icon-arrow-down.svg';

import Icon from './Icon';

export const Option = props => <option {...props} />;

Option.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.any,
};

const parseOptions = options => (
  map(options, option => ({
    text: get(option, 'props.text', {}),
    value: get(option, 'props.value', {}),
  }))
);

const MenuItem = ({ option, selected, onSelect }) => {
  const itemClasses = classnames(
    'Dropdown-menuItem',
    { 'is-selected': selected }
  );

  return (
    <div className={itemClasses} onClick={onSelect}>
      {option.text}
    </div>
  );
};

export class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.handleDocumentClick = bind(this.handleDocumentClick, this);
    this.state = { visible: false };
  }

  componentDidMount() {
    on(document, 'click', this.handleDocumentClick, true);
  }

  componentWillUnmount() {
    off(document, 'click', this.handleDocumentClick, true);
  }

  handleDocumentClick(event) {
    if (this.state.visible) {
      this.setState({ visible: false });
    } else if (findDOMNode(this).contains(event.target)) {
      this.setState({ visible: true });
    }
  }

  render() {
    const { children, placeholder, value, onChange } = this.props;
    const { visible } = this.state;

    const options = parseOptions(children);
    const activeOption = find(options, { value }) || head(options);

    return (
      <div className="Dropdown">
        <div className="Dropdown-button">
          <div className="Dropdown-text">
            {get(activeOption, 'text', placeholder)}
          </div>

          <div className="Dropdown-iconContainer">
            <Icon
              className="Dropdown-icon"
              glyph={iconArrowDown}
            />
          </div>
        </div>

        <div className={classnames('Dropdown-menu', { 'is-visible': visible })}>
          {map(options, option =>
            <MenuItem
              key={option.value}
              option={option}
              selected={option.value === value}
              onSelect={partial(onChange, option.value)}
            />
          )}
        </div>
      </div>
    );
  }
}

MenuItem.propTypes = {
  option: PropTypes.shape({
    text: PropTypes.string,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};
