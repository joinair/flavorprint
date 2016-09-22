
import React, { Component, PropTypes } from 'react';

import bind from 'lodash/bind';
import classnames from 'classnames';

import iconCamera from 'assets/images/icons/icon-camera.svg';

import Button from 'components/ui-elements/Button';
import Icon from 'components/ui-elements/Icon';
import CloudinaryImage from 'components/ui-elements/CloudinaryImage';
import Preloader from 'components/ui-elements/Preloader';

const INPUT_ID = 'recipePhoto';

const RecipePhotoShow = ({ src, onChange, onRemove }) => (
  <div className="RecipeBuilder-photo-show">
    <CloudinaryImage
      className="RecipeBuilder-photo-preview"
      transformation="c_fill,c_limit,h_250,f_auto"
      url={src}
    />
    <div className="RecipeBuilder-photo-actions">
      <Button
        className="RecipeBuilder-photo-action"
        size="small"
        onClick={onChange}
      >
        Change photo
      </Button>

      <Button
        className="RecipeBuilder-photo-action"
        color="grey"
        size="small"
        onClick={onRemove}
      >
        Remove photo
      </Button>
    </div>
  </div>
);

const RecipePhotoEmpty = ({ isUploading, onAdd }) => (
  <div className={classnames('RecipeBuilder-photo-empty', { 'is-uploading': isUploading })}>
    {isUploading && <Preloader />}
    {!isUploading &&
      <label
        className="RecipeBuilder-photo-label"
        htmlFor={INPUT_ID}
      >
        <div className="RecipeBuilder-photo-choose">
          <div className="RecipeBuilder-photo-iconContainer">
            <Icon
              className="RecipeBuilder-photo-icon"
              glyph={iconCamera}
            />
          </div>

          <Button outline onClick={onAdd}>
            Add photo
          </Button>
        </div>
      </label>
    }
  </div>
);

class RecipePhoto extends Component {
  constructor(props) {
    super(props);

    this.handleAdd = bind(this.handleAdd, this);
    this.handleChange = bind(this.handleChange, this);
  }

  handleAdd() {
    this.refs.input.click();
  }

  handleChange(event) {
    const reader = new FileReader();
    const file = event.target.files[0];

    if (!file) return undefined;

    reader.onload = upload => {
      this.props.onLoad(upload.target.result);
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { isUploading, src, onRemove } = this.props;

    return (
      <div className="RecipeBuilder-photo">
        {src && !isUploading
          ? <RecipePhotoShow src={src} onChange={this.handleAdd} onRemove={onRemove} />
          : <RecipePhotoEmpty isUploading={isUploading} onAdd={this.handleAdd} />
        }
        <input
          accept="image/*"
          hidden
          id={INPUT_ID}
          ref="input"
          type="file"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

RecipePhotoShow.propTypes = {
  src: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

RecipePhotoEmpty.propTypes = {
  isUploading: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
};

RecipePhoto.propTypes = {
  isUploading: PropTypes.bool,
  src: PropTypes.string,
  onLoad: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default RecipePhoto;
