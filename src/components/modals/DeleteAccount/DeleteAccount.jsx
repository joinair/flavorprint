
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import map from 'lodash/map';

import './styles.css';

import Button from 'components/ui-elements/Button';
import Checkbox from 'components/ui-elements/Checkbox';
import ModalHeader from 'components/tmp/Modal/ModalHeader';
import Textarea from 'components/ui-elements/Textarea';

const leavingReasons = [
  { value: 'TOO_MANY_EMAILS', label: "I'm getting too many emails" },
  { value: 'NO_GOOD_RECIPES', label: "I can't find any good recipes" },
  { value: 'RECIPES_ARENT_SUITABLE',
    label: "Whisk is suggesting recipes that aren't suitable for me" },
  { value: 'DONT_LIKE_WHISK', label: "I don't use or like Whisk" },
  { value: 'DONT_UNDERSTAND', label: "I don't understand Whisk" },
  { value: 'PRIVACY_CONCERN', label: 'I have a privacy concern' },
  { value: 'OTHER', label: 'Other' },
];

class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.state = { reason: false, comment: '' };
    this.onReasonChange = bind(this.onReasonChange, this);
    this.onCommentChange = bind(this.onCommentChange, this);
    this.onDelete = bind(this.onDelete, this);
  }

  onCommentChange(comment) {
    this.setState({ comment });
  }

  onReasonChange(reason) {
    return () => {
      this.setState({ reason });
    };
  }

  onDelete() {
    const { onDelete } = this.props;
    const { reason, comment } = this.state;
    onDelete(reason, comment);
  }

  renderCommentEditor() {
    const { comment } = this.state;
    return (
      <Textarea
        value={comment}
        onChange={this.onCommentChange}
        placeholder="Can you give us a few more details?"
        className="DeleteAccountModal-reason-comment"
      />
    );
  }

  renderReasons() {
    const { reason } = this.state;

    return map(leavingReasons, ({ label, value }) => {
      const selected = reason === value;

      return (
        <div className="DeleteAccountModal-reason" key={value}>
          <Checkbox
            type="radio"
            onChange={this.onReasonChange(value)}
            checked={selected}
            label={label}
          />
          {selected && this.renderCommentEditor()}
        </div>
      );
    });
  }

  render() {
    const { onClose } = this.props;
    const { reason } = this.state;

    return (
      <div className="DeleteAccountModal">
        <ModalHeader title="Is this goodbye?" onHide={onClose} />

        <div className="DeleteAccountModal-form">
          <div className="DeleteAccountModal-message">
            <div>Sorry to see you go! Tell us why you{"'"}re leaving:</div>
            {this.renderReasons()}
          </div>

          <div className="DeleteAccountModal-warning">
            You’ll lose all your saved recipes, shopping lists,
            and preferences. This cannot be undone.
          </div>

          <div className="DeleteAccountModal-actions">
            <Button
              className="DeleteAccountModal-action"
              color="grey"
              outline
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="DeleteAccountModal-action"
              color="danger"
              onClick={this.onDelete}
              disabled={!reason}
            >
              Delete account forever
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

DeleteAccount.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteAccount;
