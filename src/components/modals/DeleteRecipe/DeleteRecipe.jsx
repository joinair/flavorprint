
import React, { PropTypes } from 'react';

import './styles.css';

import Button from 'components/ui-elements/Button';
import ModalHeader from 'components/tmp/Modal/ModalHeader';

const DeleteRecipe = ({ onClose, onDelete }) => (
  <div className="DeleteRecipeModal">
    <ModalHeader title="Delete this recipe" onHide={onClose} />

    <div className="DeleteRecipeModal-form">
      <div className="DeleteRecipeModal-message">
        Are you sure you want to permanently remove this recipe from Whisk?
      </div>

      <div className="DeleteRecipeModal-actions">
        <Button
          className="DeleteRecipeModal-action"
          color="grey"
          outline
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          className="DeleteRecipeModal-action"
          color="danger"
          onClick={onDelete}
        >
          Delete recipe
        </Button>
      </div>
    </div>
  </div>
);

DeleteRecipe.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteRecipe;
