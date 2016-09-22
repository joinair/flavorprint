
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';

import iconTrashBinLg from 'assets/images/icons/icon-trashbin-lg.svg';

import Avatar from 'components/ui-elements/Avatar';
import Button from 'components/ui-elements/Button';
import Preloader from 'components/ui-elements/Preloader';

class SettingsAvatar extends Component {
  constructor(props) {
    super(props);

    this.handleAdd = bind(this.handleAdd, this);
    this.handleChange = bind(this.handleChange, this);
    this.handleClick = bind(this.handleClick, this);
  }

  handleAdd() {
    this.refs.input.click();
  }

  handleClick(event) {
    event.target.value = ''; // eslint-disable-line no-param-reassign
  }

  handleChange(event) {
    const reader = new FileReader();
    const fileURL = event.target.files[0];
    // FIXME: prevent reading when canceled file change

    reader.onload = upload => {
      const image = upload.target.result;
      this.props.onLoad(image);
    };

    reader.readAsDataURL(fileURL);
  }

  render() {
    const { isUploading, src, onDelete } = this.props;

    const addBtn = (
      <div className="SettingsAvatar-actions-item" key="add-button">
        <Button
          disabled={isUploading}
          outline
          onClick={this.handleAdd}
        >
          Add photo
        </Button>
      </div>
    );

    const editBtn = (
      <div className="SettingsAvatar-actions-item" key="edit-button">
        <Button
          disabled={isUploading}
          outline
          onClick={this.handleAdd}
        >
          Change photo
        </Button>
      </div>
    );

    const deleteBtn = (
      <div className="SettingsAvatar-actions-item" key="delete-button">
        <Button
          className="SettingsAvatar-action SettingsAvatar-action--delete"
          color="transparent"
          disabled={isUploading}
          icon={iconTrashBinLg}
          iconStyle={{ height: 16, width: 15 }}
          onClick={onDelete}
        >
          Delete photo
        </Button>
      </div>
    );

    return (
      <div className="SettingsAvatar">
        <div className="SettingsAvatar-container">
          {isUploading
            ? (
              <div className="SettingsAvatar-image is-uploading">
                <Preloader />
              </div>
            ) : (
              <Avatar
                className="SettingsAvatar-image"
                height={150}
                iconClassName="SettingsAvatar-image-icon"
                url={src}
                width={150}
              />
            )
          }
          <div className="SettingsAvatar-actions">
            {src ? [editBtn, deleteBtn] : addBtn}
          </div>
        </div>

        <input
          ref="input"
          type="file"
          onChange={this.handleChange}
          onClick={this.handleClick}
          hidden
        />
      </div>
    );
  }
}

SettingsAvatar.propTypes = {
  isUploading: PropTypes.bool.isRequired,
  src: PropTypes.string,

  onLoad: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SettingsAvatar;
