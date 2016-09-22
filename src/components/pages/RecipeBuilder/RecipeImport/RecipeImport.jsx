
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import bind from 'lodash/bind';
import isEmpty from 'lodash/isEmpty';

import getCustomErrorDescription from 'helpers/getCustomErrorDescription';

import BodyClassName from 'components/ui-elements/BodyClassName';
import Input from 'components/ui-elements/Input';
import Button from 'components/ui-elements/Button';

import linkIcon from 'assets/images/icons/icon-link.svg';

class RecipeImport extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { text: '', fetching: false };
    this.setText = bind(this.setText, this);
    this.onImport = bind(this.onImport, this);
    this.onSuccess = bind(this.onSuccess, this);
    this.onFailure = bind(this.onFailure, this);
  }

  onImport() {
    const url = this.state.text;
    const { importByUrl } = this.props;

    this.setState({ fetching: true });
    importByUrl(url).subscribe(this.onSuccess, this.onFailure);
  }

  onSuccess(response) {
    const { externalUrl } = response;
    const {
      navigateToExternalUrl,
      navigateToCookbook,
    } = this.props;

    if (externalUrl) {
      navigateToExternalUrl(externalUrl);
    } else {
      navigateToCookbook();
    }
  }

  onFailure(rawError) {
    const error = rawError.code ? rawError : {
      code: 'internalError',
    };
    this.setState({ fetching: false, error });
    this.refs.input.focus();
  }

  setText(text) {
    this.setState({ text, error: null });
  }

  render() {
    const body = <BodyClassName className="Body--whiteBackground" />;
    const meta = <Helmet title="Import recipe by URL - Whisk" />;

    const { text, fetching, error } = this.state;
    const disabled = fetching || isEmpty(text);
    const errorText = error && getCustomErrorDescription('recipe', 'import', error);

    return (
      <div className="RecipeBuilder">
        {body}
        {meta}

        <div className="RecipeBuilder-container RecipeBuilder-import">
          <div className="RecipeBuilder-import-text">
            Enter the URL of the recipe you want to save
          </div>

          <div className="RecipeBuilder-import-inputForm">
            <Input
              autoFocus
              className="RecipeBuilder-import-inputForm-input"
              value={text}
              ref="input"
              onChange={this.setText}
              onSubmit={this.onImport}
              error={errorText}
              icon={linkIcon}
              iconStyle={{ width: '16px', height: '16px' }}
            />
            <Button
              className="RecipeBuilder-import-inputForm-button"
              size="large"
              disabled={disabled}
              onClick={this.onImport}
            >
              Import
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

RecipeImport.propTypes = {
  importByUrl: PropTypes.func.isRequired,
  navigateToExternalUrl: PropTypes.func.isRequired,
  navigateToCookbook: PropTypes.func.isRequired,
};

export default RecipeImport;
