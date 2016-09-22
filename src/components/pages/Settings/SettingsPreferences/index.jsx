
import React, { PropTypes } from 'react';

import includes from 'lodash/includes';
import intersection from 'lodash/intersection';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import partial from 'lodash/partial';

import {
  ABOUT_YOURSELF,
  ALLERGIES,
  AVOIDANCES,
  SPECIAL_DIETS,
  COMBINED_AVOIDANCES,
  INVENTORIES,
} from 'constants/Onboarding';

import Allergies from './Allergies';
import Avoidances from './Avoidances';
import Diets from './Diets';
import Difficulty from './Difficulty';
import Inventories from './Inventories';
import Servings from './Servings';

import Button from 'components/ui-elements/Button';
import FormControl from 'components/pages/Settings/Form/FormControl';
import FormGroup from 'components/pages/Settings/Form/FormGroup';

const SettingsPreferences = ({ fields, preferences, onChange, onSave }) => {
  const getSyncedValue = (step, value) => {
    const synced = isArray(step)
      ? !isEmpty(intersection(fields.onboarding, step))
      : includes(fields.onboarding, step);

    return synced ? value : undefined;
  };

  return (
    <div className="SettingsPreferences">
      <FormGroup label="Cooking skill">
        <FormControl>
          <Difficulty
            items={preferences.difficulty}
            value={fields.difficulty}
            onChange={partial(onChange, 'difficulty', ABOUT_YOURSELF)}
          />
        </FormControl>
      </FormGroup>

      <FormGroup label="Household">
        <FormControl>
          <Servings
            label="Adults"
            minValue={1}
            value={fields.servesAdults}
            onChange={partial(onChange, 'servesAdults', ABOUT_YOURSELF)}
          />
          <Servings
            label="Kids"
            minValue={0}
            value={fields.servesKids}
            onChange={partial(onChange, 'servesKids', ABOUT_YOURSELF)}
          />
        </FormControl>
      </FormGroup>

      <FormGroup label="Diets" multilineButtons>
        <FormControl>
          <Diets
            items={preferences.diets}
            value={
              getSyncedValue(
                [SPECIAL_DIETS, COMBINED_AVOIDANCES],
                fields.diet || null
              )
            }
            onChange={partial(onChange, 'diet', SPECIAL_DIETS)}
          />
        </FormControl>
      </FormGroup>

      <FormGroup label="Allergies" multilineButtons>
        <FormControl>
          <Allergies
            items={preferences.allergies}
            value={
              getSyncedValue(
                [ALLERGIES, COMBINED_AVOIDANCES],
                fields.allergies
              )
            }
            onChange={partial(onChange, 'allergies', ALLERGIES)}
          />
        </FormControl>
      </FormGroup>

      <FormGroup label="Avoidances" multiline>
        <FormControl>
          <Avoidances
            allergies={fields.allergies}
            diet={fields.diet}
            inventories={preferences.inventories}
            items={preferences.dislikedProducts}
            value={fields.dislikedProducts}
            onChange={partial(onChange, 'dislikedProducts', AVOIDANCES)}
          />
        </FormControl>
      </FormGroup>

      {!isEmpty(preferences.inventories) &&
        <FormGroup label="Supermarkets" multilineButtons>
          <FormControl>
            <Inventories
              items={preferences.inventories}
              value={getSyncedValue(INVENTORIES, fields.inventories)}
              onChange={partial(onChange, 'inventories', INVENTORIES)}
            />
          </FormControl>
        </FormGroup>
      }

      <div className="Settings-actionGroup">
        <div className="Settings-actionGroup-item Settings-actionGroup-item--save">
          <Button
            className="Settings-button Settings-button--save"
            size="large"
            onClick={onSave}
          >
            Save settings
          </Button>
        </div>
      </div>
    </div>
  );
};

SettingsPreferences.propTypes = {
  fields: PropTypes.object.isRequired,
  preferences: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default SettingsPreferences;
