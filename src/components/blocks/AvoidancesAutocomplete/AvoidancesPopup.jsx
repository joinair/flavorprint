
import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';

import bind from 'lodash/bind';
import map from 'lodash/map';
import partial from 'lodash/partial';
import some from 'lodash/some';

import iconDisabled from 'assets/images/icons/icon-disabled.svg';

import Icon from 'components/ui-elements/Icon';

const getMatches = (text, matcher) => {
  const replacer = match => `=${match}=`;
  return text.replace(new RegExp(matcher, 'i'), replacer).split(/=/);
};

const hasItems = group => !!group.items.length;
const hasNonEmptyGroups = groups => !some(groups, hasItems);

const Item = ({ term, text, disliked, onSelect, selected }) => {
  const itemClasses = classnames({
    'AvoidancesAutocomplete-popup-item': true,
    'AvoidancesAutocomplete-popup-item--disliked': disliked,
    'AvoidancesAutocomplete-popup-item--selected': selected,
  });

  const [before, match, after] = getMatches(text, term.trim());

  return (
    <div className={itemClasses} onClick={!disliked && onSelect}>
      {disliked &&
        <div className="AvoidancesAutocomplete-popup-item-iconContainer">
          <Icon
            className="AvoidancesAutocomplete-popup-item-icon"
            glyph={iconDisabled}
          />
        </div>
      }
      <span className="AvoidancesAutocomplete-popup-item-text">
        {!!before && before}
        {!!match && <b>{match}</b>}
        {after}
      </span>
    </div>
  );
};

const Group = ({ group, term, onItemSelect, selectedIndex }) => (
  <div className="AvoidancesAutocomplete-popup-group">
    {!!group.text &&
      <div className="AvoidancesAutocomplete-popup-group-text">
        {group.text}:
      </div>
    }
    <div className="AvoidancesAutocomplete-popup-group-items">
      {map(group.items, (item, idx) =>
        <Item
          {...item}
          selected={idx === selectedIndex}
          key={item.text}
          term={term}
          onSelect={partial(onItemSelect, item.id)}
        />
      )}
    </div>
  </div>
);

class AvoidancesPopup extends Component {
  constructor(props) {
    super(props);

    this.getFirstAvailableItem = bind(this.getFirstAvailableItem, this);
    this.state = { selectedIndex: 0 };
  }

  getFirstAvailableItem() {
    const { selectedIndex } = this.state;
    const { groups } = this.props;
    const group = groups[0];
    if (group) {
      const { items } = group;
      const index = Math.min(selectedIndex, items.length - 1);
      return items[index];
    }
  }

  selectPrevious() {
    const { selectedIndex } = this.state;
    const newIndex = Math.max(selectedIndex - 1, 0);
    this.setState({ selectedIndex: newIndex });
  }

  selectNext() {
    const { selectedIndex } = this.state;
    const { groups } = this.props;
    const group = groups[0];
    if (group) {
      const { items } = group;
      const newIndex = Math.min(selectedIndex + 1, items.length - 1);
      this.setState({ selectedIndex: newIndex });
    }
  }

  render() {
    const { groups, term, onSelect } = this.props;
    const { selectedIndex } = this.state;

    return (
      <div className="AvoidancesAutocomplete-popup">
        <div className="AvoidancesAutocomplete-popup-inner">
          <div className="AvoidancesAutocomplete-popup-list">
            {term && hasNonEmptyGroups(groups)
              ? (
                <div className="AvoidancesAutocomplete-popup-message">
                  Ingredient not found
                </div>
              ) : (
                map(groups, (group, idx) => (
                  hasItems(group) ?
                    <Group
                      group={group}
                      key={group.text}
                      term={term}
                      onItemSelect={onSelect}
                      selectedIndex={(idx === 0) ? selectedIndex : -1}
                    /> : null
                ))
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  term: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  disliked: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

Group.propTypes = {
  group: PropTypes.object.isRequired,
  term: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
};

AvoidancesPopup.propTypes = {
  groups: PropTypes.array.isRequired,
  term: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default AvoidancesPopup;
