
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { close } from 'actions/modal';

import Modal from './Modal';

const modalSelector = createStructuredSelector({
  modal: state => state.modal,
});

const actions = {
  onModalClose: close,
};

export default connect(modalSelector, actions)(Modal);
