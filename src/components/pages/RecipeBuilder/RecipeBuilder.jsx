/* eslint no-param-reassign:0 */

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import assign from 'lodash/assign';
import bind from 'lodash/bind';
import filter from 'lodash/filter';
import get from 'lodash/get';
import merge from 'lodash/merge';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import partial from 'lodash/partial';
import pick from 'lodash/pick';
import reduce from 'lodash/reduce';
import set from 'lodash/set';
import size from 'lodash/size';
import take from 'lodash/take';

import getCustomErrorDescription from 'helpers/getCustomErrorDescription';

import './styles.css';
import roundedExclamationIcon from 'assets/images/icons/icon-rounded-exclamation.svg';

import { CenteredPreloader } from 'components/ui-elements/Preloader';
import BodyClassName from 'components/ui-elements/BodyClassName';
import Input from 'components/ui-elements/Input';
import Button from 'components/ui-elements/Button';
import Icon from 'components/ui-elements/Icon';
import Textarea from 'components/ui-elements/Textarea';

import FormControl from './Form/FormControl';
import FormGroup from './Form/FormGroup';
import RecipeIngredients from './RecipeIngredients';
import RecipeInstructions from './RecipeInstructions';
import RecipeYield from './RecipeYield';
import RecipePhoto from './RecipePhoto';
import RecipeTime from './RecipeTime';
import RecipeActions from './RecipeActions';

const FIELDS = [
  'name', 'description', 'image',
  'recipeYield', 'durations', 'sourceUrl',
  'publisher',
];

const combFields = fields => (
  assign(
    {},
    fields,
    {
      ingredients: filter(fields.ingredients, item => item.text),
      instructions: filter(fields.instructions, item => item.text),
    }
  )
);

const fillSteps = steps => {
  const length = Math.max(size(steps), 3);
  const empty = { text: '' };
  return take((steps || []).concat([empty, empty, empty]), length);
};

const getFields = props =>
  assign(
    pick(props.recipe.data, FIELDS),
    {
      ingredients: fillSteps(props.recipe.data.ingredients),
      instructions: fillSteps(props.recipe.data.instructions),
    }
  );

class RecipeBuilder extends Component {
  constructor(props) {
    super(props);

    this.handleChange = bind(this.handleChange, this);
    this.handleSubmit = bind(this.handleSubmit, this);
    this.handleAddStep = bind(this.handleAddStep, this);
    this.handleImageRemove = bind(this.handleImageRemove, this);
    this.handleImageUpload = bind(this.handleImageUpload, this);
    this.handleRemoveStep = bind(this.handleRemoveStep, this);
    this.handleStepChange = bind(this.handleStepChange, this);
    this.handleSave = bind(this.handleSave, this);

    this.state = assign({
      fields: getFields(props),
      errors: {},
      isPhotoUploading: false,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      fields: getFields(props),
    });
  }

  handleChange(fieldPath, eventOrValue) {
    const { errors, fields } = this.state;

    const fieldValue = get(eventOrValue, 'target.value', eventOrValue);
    const fieldObject = set({}, fieldPath, fieldValue);

    this.setState({
      errors: omit(errors, fieldPath),
      fields: merge({}, fields, fieldObject),
    });
  }

  handleSubmit(nextField) {
    this.refs[nextField].focus();
  }

  handleImageUpload(image) {
    this.setState({ isPhotoUploading: true });

    const onSuccess = data => {
      this.setState({
        fields: assign({}, this.state.fields, {
          image: {
            width: data.width,
            height: data.height,
            url: data.secure_url,
          },
        }),
        isPhotoUploading: false,
      });
    };
    const onError = () => {
      this.setState({ isPhotoUploading: false });
    };

    this.props
      .onImageUpload(image)
      .subscribe(onSuccess, onError);
  }

  handleImageRemove() {
    this.setState({
      fields: assign({}, this.state.fields, { image: null }),
    });
  }

  handleAddStep(collection) {
    return () => {
      const { errors, fields } = this.state;

      this.setState({
        errors: omit(errors, collection),
        fields: assign(
          {},
          fields,
          { [collection]: [...fields[collection], { text: '' }] }
        ),
      });
    };
  }

  handleStepChange(collection) {
    return (index, eventOrValue, cb = noop) => {
      const { errors, fields } = this.state;
      const current = fields[collection];

      this.setState({
        errors: omit(errors, collection),
        fields: assign(
          {},
          fields,
          {
            [collection]: [
              ...current.slice(0, index),
              { text: get(eventOrValue, 'target.value', eventOrValue) },
              ...current.slice(index + 1),
            ],
          }
        ),
      }, cb);
    };
  }

  handleRemoveStep(collection) {
    const { errors, fields } = this.state;

    return index => {
      const current = fields[collection];

      this.setState({
        errors: omit(errors, collection),
        fields: assign(
          {},
          fields,
          { [collection]: current.slice(0, index).concat(current.slice(index + 1)) }
        ),
      });
    };
  }

  handleSave() {
    const { recipe, onSave, onSuccessfulSave, showNotification } = this.props;
    const { id } = recipe;

    const onSuccess = (data) => {
      const notification = id
        ? 'Your recipe has been updated and is ready to share with the world!'
        : 'Your recipe has been added to your cookbook and is ready to share with the world!';

      showNotification(notification);
      onSuccessfulSave(data);
    };
    const onError = ({ httpCode, fields }) => {
      if (httpCode === 400) {
        const recipeErrors = reduce(
          fields,
          (errors, error, path) =>
            set(errors, path, getCustomErrorDescription('recipe', path, error)),
          {}
        );

        this.setState({
          errors: pick(recipeErrors.data, FIELDS, 'ingredients'),
        });
      }
    };

    onSave({ id, data: combFields(this.state.fields) }).subscribe(onSuccess, onError);
  }

  render() {
    const { isEditing, isFetching, recipe, isTizenFridge, onDelete } = this.props;
    const { errors, fields, isPhotoUploading } = this.state;
    const isErrored = !recipe;

    const body = <BodyClassName className="Body--whiteBackground" />;
    const meta =
      <Helmet title={`${isEditing ? 'Edit' : 'Add'} your recipe - Whisk`} />;

    if (isFetching || isErrored) {
      return (
        <div>
          {body}
          {meta}
          <CenteredPreloader />
        </div>
      );
    }

    const { id, externalUrl } = recipe;
    const { image } = fields;

    const { pendingExternal, sourceUrl, publisher } = recipe.data;

    return (
      <div className="RecipeBuilder">
        {body}
        {meta}

        <div className="RecipeBuilder-container">
          <h1 className="RecipeBuilder-title">
            {id ? 'Edit your recipe' : 'Add your recipe'}
          </h1>

          {pendingExternal && (
            <div className="RecipeBuilder-warning">
              <Icon
                className="RecipeBuilder-warning-icon"
                glyph={roundedExclamationIcon}
              />
              <div className="RecipeBuilder-warning-text">
                Sorry, we couldn’t import this recipe automatically for you.
                Add it using the recipe builder below.
                <a className="RecipeBuilder-warning-button" href={sourceUrl} target="_blank">
                  <Button>View on {publisher.displayName}</Button>
                </a>
              </div>
            </div>
          )}

          {!isTizenFridge &&
            <RecipePhoto
              isUploading={isPhotoUploading}
              src={get(image, 'url')}
              onLoad={this.handleImageUpload}
              onRemove={this.handleImageRemove}
            />
          }

          {!externalUrl && sourceUrl && (
            <FormGroup label="Source Url">
              <FormControl>
                <a href={sourceUrl} target="_blank">{publisher.displayName}</a>
              </FormControl>
            </FormGroup>
          )}

          <FormGroup label="Title">
            <FormControl>
              <Input
                error={errors.name}
                placeholder="Give your recipe a name"
                value={fields.name}
                onChange={partial(this.handleChange, 'name')}
                onSubmit={partial(this.handleSubmit, 'description')}
              />
            </FormControl>
          </FormGroup>

          <FormGroup label="Description">
            <FormControl>
              <Textarea
                error={errors.description}
                placeholder=
                  "Introduce your recipe! Why you like it, where it came from,
                  cooking tips, or serving suggestions."
                ref="description"
                value={fields.description}
                onChange={partial(this.handleChange, 'description')}
                onSubmit={partial(this.handleSubmit, 'ingredients')}
              />
            </FormControl>
          </FormGroup>

          <FormGroup label="Ingredients">
            <FormControl>
              <RecipeIngredients
                error={errors.ingredients}
                ingredients={fields.ingredients}
                ref="ingredients"
                addIngredient={this.handleAddStep('ingredients')}
                removeIngredient={this.handleRemoveStep('ingredients')}
                updateIngredient={this.handleStepChange('ingredients')}
              />
            </FormControl>
          </FormGroup>

          <FormGroup label="Servings">
            <FormControl>
              <RecipeYield
                error={errors.recipeYield}
                ref="recipeYield"
                value={fields.recipeYield}
                onChange={partial(this.handleChange, 'recipeYield')}
                onSubmit={partial(this.handleSubmit, 'instructions')}
              />
            </FormControl>
          </FormGroup>

          <FormGroup label="Directions">
            <FormControl>
              <RecipeInstructions
                instructions={fields.instructions}
                ref="instructions"
                addInstruction={this.handleAddStep('instructions')}
                removeInstruction={this.handleRemoveStep('instructions')}
                updateInstruction={this.handleStepChange('instructions')}
              />
            </FormControl>
          </FormGroup>

          <FormGroup label="Time" labelClassName="RecipeBuilder-timeLabel">
            <FormControl>
              <RecipeTime
                error={get(errors, 'durations.prep')}
                label="Prep"
                ref="durations.prep"
                value={get(fields, 'durations.prep')}
                onChange={partial(this.handleChange, 'durations.prep')}
                onSubmit={partial(this.handleSubmit, 'durations.cook')}
              />
              <RecipeTime
                error={get(errors, 'durations.cook')}
                label="Cook"
                ref="durations.cook"
                value={get(fields, 'durations.cook')}
                onChange={partial(this.handleChange, 'durations.cook')}
                onSubmit={this.handleSave}
              />
            </FormControl>
          </FormGroup>

          <RecipeActions
            publishOnly={!!pendingExternal}
            recipeId={recipe.id}
            onDelete={onDelete}
            onSave={this.handleSave}
          />
        </div>
      </div>
    );
  }
}

RecipeBuilder.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  isFetching: PropTypes.any,
  isTizenFridge: PropTypes.any,

  recipe: PropTypes.shape({
    id: PropTypes.any,

    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.shape({
        url: PropTypes.string,
      }),
      durations: PropTypes.shape({
        cook: PropTypes.number,
        prep: PropTypes.number,
      }),
      recipeYield: PropTypes.number,

      ingredients: PropTypes.array.isRequired,
      instructions: PropTypes.array.isRequired,
    }).isRequired,
  }),

  onDelete: PropTypes.func.isRequired,
  onImageUpload: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSuccessfulSave: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
};

export default RecipeBuilder;
