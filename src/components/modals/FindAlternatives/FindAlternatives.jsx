
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import debounce from 'lodash/debounce';
import isString from 'lodash/isString';
import noop from 'lodash/noop';

import './styles.css';

import Preloader from 'components/ui-elements/Preloader';
import ModalBody from 'components/tmp/Modal/ModalBody';
import ModalHeader from 'components/tmp/Modal/ModalHeader';

import FindAlternativesSearch from './Search';
import FindAlternativesOptions from './Options';

const getParams = state => ({
  limit: 8,
  offset: state.paging.offset || 0,
});

class FindAlternatives extends Component {
  constructor(props) {
    super(props);

    this.searchItems = bind(this.searchItems, this);
    this.searchItemsDelayed = debounce(this.searchItems, 1000);
    this.handleTermChange = bind(this.handleTermChange, this);
    this.handleOptionSelect = bind(this.handleOptionSelect, this);

    this.state = {
      term: props.item.key.text,
      items: [],
      paging: {},

      isLoading: false,
      isInitialLoading: true,
      hasOptions: false,
    };
  }

  componentDidMount() {
    const { item, onLoad } = this.props;

    const onSuccess = data => {
      if (data.items.length) {
        this.setState({
          items: data.items,
          paging: data.paging,
          isInitialLoading: false,
          hasOptions: true,
        });
      } else {
        this.setState({ hasOptions: false });
        this.searchItems();
      }
    };

    onLoad(item.id, getParams(this.state))
      .subscribe(onSuccess, noop);
  }

  componentWillUnmount() {
    this.searchItemsDelayed.cancel();
  }

  searchItems(nextTerm) {
    const { item, onLoad, onSearch } = this.props;
    const { items, paging, hasOptions, isLoading, isInitialLoading } = this.state;

    if (!isInitialLoading && !isLoading) {
      this.setState({ isLoading: true });
    }

    const onSuccess = data => {
      this.setState({
        items: paging.offset ? items.concat(data.items) : data.items,
        paging: data.paging,
        isLoading: false,
        isInitialLoading: false,
      });
    };

    const term = isString(nextTerm) ? nextTerm : this.state.term;
    const params = getParams(this.state);

    const subject$ = hasOptions
      ? onLoad(item.id, params)
      : onSearch(term, params);

    subject$.subscribe(onSuccess, noop);
  }

  handleTermChange(term) {
    this.setState({
      term,
      items: [],
      paging: {},
      isLoading: !!term,
      hasOptions: false,
    });

    if (term) {
      this.searchItemsDelayed(term);
    } else {
      this.searchItemsDelayed.cancel();
    }
  }

  handleOptionSelect(option) {
    this.props.onOptionSelect(this.props.item, option);
  }

  render() {
    const { item, onClose } = this.props;
    const { term, items, paging, isLoading, isInitialLoading } = this.state;

    return (
      <div className="FindAlternatives">
        <ModalHeader title={item.key.text} onHide={onClose} />

        <ModalBody>
          <div className="FindAlternatives-inner">
            {isInitialLoading &&
              <Preloader className="FindAlternatives-preloader" />
            }

            {!isInitialLoading &&
              <FindAlternativesSearch
                term={term}
                onTermChange={this.handleTermChange}
              />
            }

            {!isInitialLoading &&
              <FindAlternativesOptions
                hasMore={items.length < paging.total}
                item={item}
                isLoading={isLoading}
                options={items}
                onClose={onClose}
                onLoadMore={this.searchItems}
                onOptionSelect={this.handleOptionSelect}
              />
            }
          </div>
        </ModalBody>
      </div>
    );
  }
}

FindAlternatives.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    key: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  onOptionSelect: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default FindAlternatives;
