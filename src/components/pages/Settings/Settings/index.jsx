
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import assign from 'lodash/assign';
import bind from 'lodash/bind';
import debounce from 'lodash/debounce';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import omit from 'lodash/omit';
import partial from 'lodash/partial';
import pick from 'lodash/pick';
import union from 'lodash/union';

import config from 'constants/Config';
import routes from 'constants/Routes';

import './styles.css';

import Button from 'components/ui-elements/Button';
import Input from 'components/ui-elements/Input';
import Textarea from 'components/ui-elements/Textarea';
import BodyClassName from 'components/ui-elements/BodyClassName';
import Checkbox from 'components/ui-elements/Checkbox';
import { Tab, Tabs, TabList } from 'components/ui-elements/Tabs';

import FormControl from '../Form/FormControl';
import FormControlRow from '../Form/FormControlRow';
import FormGroup from '../Form/FormGroup';

import SettingsAvatar from '../SettingsAvatar';
import SettingsPassword from '../SettingsPassword';
import SettingsPreferences from '../SettingsPreferences';

export const PROFILE_TAB = 'Profile';
export const PREFERENCES_TAB = 'Preferences';

const PROFILE_FIELDS = [
  'avatar', 'description', 'email', 'firstName', 'lastName',
  'username', 'cookbookVisibility', 'receiveNotifications',
];

const PREFERENCES_FIELDS = [
  'allergies', 'diet', 'difficulty', 'dislikedProducts', 'inventories',
  'onboarding', 'servesAdults', 'servesKids',
];

const USERNAME_IS_UNAVAILABLE = 'This username is unavailable';

const CheckboxList = ({ items, type, value, onChange }) => (
  <span>
    {map(items, (item, key) =>
      <Checkbox
        checked={item.value === value}
        key={key}
        label={item.label}
        type={type}
        onChange={partial(onChange, item.value)}
      />
    )}
  </span>
);

class Settings extends Component {
  constructor(props) {
    super(props);

    this.handleAvatarDelete = bind(this.handleAvatarDelete, this);
    this.handleAvatarLoad = bind(this.handleAvatarLoad, this);
    this.handleChange = bind(this.handleChange, this);
    this.handlePreferenceChange = bind(this.handlePreferenceChange, this);
    this.handleSave = bind(this.handleSave, this);
    this.handleSubmit = bind(this.handleSubmit, this);
    this.handleUsernameChange = bind(this.handleUsernameChange, this);
    this.validateUsernameUniqueness =
      debounce(bind(this.validateUsernameUniqueness, this), 1000);

    this.state = {
      errors: {},
      fields: pick(
        props.profile,
        [...PROFILE_FIELDS, ...PREFERENCES_FIELDS]
      ),
      isAvatarUploading: false,
    };
  }

  validateUsernameUniqueness(username) {
    const { validateUsername } = this.props;
    const { errors } = this.state;

    const changeState = newErrors => this.setState({ errors: newErrors });
    const onSuccess = changeState(omit(errors, 'username'));
    const onError = ({ fields }) => {
      const { code, desc } = fields.username;

      if (code === 'auth.malformedUsername' ||
          code === 'auth.usernameAlreadyTaken') {
        changeState(assign({}, errors, { username: desc }));
      }
    };

    validateUsername(username).subscribe(onSuccess, onError);
  }

  handleUsernameChange(username) {
    this.handleChange('username', username);

    const userRoute = `/${username.toLowerCase()}`;
    const isReserved = find(routes, route => route === userRoute);

    if (username && isReserved) {
      this.validateUsernameUniqueness.cancel();
      this.setState({
        errors: assign({}, this.state.errors, { username: USERNAME_IS_UNAVAILABLE }),
      });
    } else {
      this.validateUsernameUniqueness(username);
    }
  }

  handleAvatarDelete() {
    this.handleChange('avatar', null);
  }

  handleAvatarLoad(image) {
    this.setState({ isAvatarUploading: true });

    const onSuccess = data => {
      this.setState({ isAvatarUploading: false });
      this.handleChange('avatar', data.secure_url);
    };

    const onError = () => {
      this.setState({ isAvatarUploading: false });
    };

    this.props
      .onAvatarUpload(image)
      .subscribe(onSuccess, onError);
  }

  handleChange(field, value) {
    const { errors, fields } = this.state;

    this.setState({
      errors: omit(errors, field),
      fields: assign({}, fields, { [field]: value }),
    });
  }

  handlePreferenceChange(field, step, value) {
    const { fields } = this.state;
    const onboarding = union(fields.onboarding, [step]);

    this.setState({
      fields: assign({}, fields, { [field]: value, onboarding }),
    });
  }

  handleSubmit(nextField) {
    this.refs[nextField].focus();
  }

  handleSave() {
    const onSuccess = profile => {
      this.setState({ fields: assign({}, this.state.fields, profile) });

      this.props.showNotification('Your settings have been updated');
      this.props.onLeave();
    };

    const onError = () => {
    };

    const data = assign(
      {},
      this.state.fields,
      { onboarding: this.props.allSteps }
    );

    this.props.onSave(data)
      .subscribe(onSuccess, onError);
  }

  render() {
    const {
      preferences, provider, tab, isTizenFridge,
      onDelete, onTabChange,
    } = this.props;
    const { errors, fields, isAvatarUploading } = this.state;

    const hasErrors = !isEmpty(errors);

    const content = (
      <div className="Settings">
        <div className="Settings-tabs">
          <Tabs
            className="Settings-tabsContainer Settings-container"
            onSelect={onTabChange}
          >
            <TabList className="Settings-tabList">
              <Tab
                className="Settings-tab"
                name={PROFILE_TAB}
                selected={tab === PROFILE_TAB}
              >
                Profile
              </Tab>
              <Tab
                className="Settings-tab"
                name={PREFERENCES_TAB}
                selected={tab === PREFERENCES_TAB}
              >
                Preferences
              </Tab>
            </TabList>
          </Tabs>
        </div>

        {tab === PROFILE_TAB &&
          <div className="Settings-tabPanel">
            <div className="Settings-container Settings-container--main">
              <FormGroup label="Name">
                <FormControl>
                  <FormControlRow>
                    <Input
                      error={errors.firstName}
                      placeholder="First name"
                      value={fields.firstName}
                      onChange={partial(this.handleChange, 'firstName')}
                      onSubmit={partial(this.handleSubmit, 'lastName')}
                    />
                    <Input
                      error={errors.lastName}
                      placeholder="Last name"
                      ref="lastName"
                      value={fields.lastName}
                      onChange={partial(this.handleChange, 'lastName')}
                      onSubmit={partial(this.handleSubmit, 'username')}
                    />
                  </FormControlRow>
                </FormControl>
              </FormGroup>

              <FormGroup label="Email">
                <FormControl>
                  <div className="Settings-formControl-text">
                    {fields.email}
                  </div>
                </FormControl>
              </FormGroup>

              {provider === 'whisk' && <SettingsPassword />}

              <FormGroup label="Username" multiline>
                <FormControl>
                  <Input
                    error={errors.username}
                    placeholder="Username"
                    ref="username"
                    value={fields.username}
                    onChange={this.handleUsernameChange}
                    onSubmit={partial(this.handleSubmit, 'description')}
                  />

                  <div className="Settings-formHint">
                    <span>Your FlavorPrint URL: </span>
                    <Link to={`/${fields.username}`}>
                      {config.domain.split('/')[2]}/{fields.username}
                    </Link>
                  </div>
                </FormControl>
              </FormGroup>

              <FormGroup label="About you" multiline>
                <FormControl>
                  <Textarea
                    error={errors.description}
                    placeholder=
                      "Tell us about yourself and your favorite recipes in 140 characters or less."
                    ref="description"
                    value={fields.description}
                    onChange={partial(this.handleChange, 'description')}
                  />
                </FormControl>
              </FormGroup>

              {!isTizenFridge &&
                <FormGroup
                  label="Photo"
                  labelClassName="Settings-photoLabel"
                  multiline
                >
                  <FormControl>
                    <SettingsAvatar
                      isUploading={isAvatarUploading}
                      src={fields.avatar}
                      onLoad={this.handleAvatarLoad}
                      onDelete={this.handleAvatarDelete}
                    />
                  </FormControl>
                </FormGroup>
              }

              <FormGroup label="Cookbook Privacy">
                <FormControl>
                  <div className="Settings-inlineList">
                    <CheckboxList
                      items={[
                        {
                          label: 'Public (everyone)',
                          value: 'public',
                        },
                        {
                          label: 'Private (only me)',
                          value: 'private',
                        },
                      ]}
                      type="radio"
                      value={fields.cookbookVisibility}
                      onChange={partial(this.handleChange, 'cookbookVisibility')}
                    />
                  </div>
                </FormControl>
              </FormGroup>

              <FormGroup label="Notifications">
                <FormControl>
                  <div className="Settings-inlineList">
                    <Checkbox
                      checked={fields.receiveNotifications}
                      label="Receive emails from FlavorPrint"
                      onChange={partial(this.handleChange, 'receiveNotifications')}
                    />
                  </div>
                </FormControl>
              </FormGroup>

              <div className="Settings-actionGroup">
                <div className="Settings-actionGroup-item Settings-actionGroup-item--save">
                  <Button
                    className="Settings-button Settings-button--save"
                    disabled={hasErrors}
                    size="large"
                    onClick={hasErrors ? null : this.handleSave}
                  >
                    Save settings
                  </Button>
                </div>

                <div className="Settings-actionGroup-item Settings-actionGroup-item--delete">
                  <Button
                    className="Settings-button Settings-button--delete"
                    color="transparent"
                    size="large"
                    onClick={onDelete}
                  >
                    Delete account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        }

        {tab === PREFERENCES_TAB &&
          <div className="Settings-tabPanel">
            <div className="Settings-container Settings-container--main">
              <SettingsPreferences
                fields={pick(fields, PREFERENCES_FIELDS)}
                preferences={preferences}
                onChange={this.handlePreferenceChange}
                onSave={this.handleSave}
              />
            </div>
          </div>
        }
      </div>
    );

    return (
      <div>
        <BodyClassName className="Body--whiteBackground" />
        {content}
      </div>
    );
  }
}

CheckboxList.propTypes = {
  items: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Settings.propTypes = {
  allSteps: PropTypes.array.isRequired,
  isTizenFridge: PropTypes.bool,
  preferences: PropTypes.shape({
    allergies: PropTypes.array,
    diets: PropTypes.array,
    difficulty: PropTypes.array,
    dislikedProducts: PropTypes.array,
    inventories: PropTypes.array,
  }),
  profile: PropTypes.shape({
    avatar: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    description: PropTypes.string,
    username: PropTypes.string,

    cookbookVisibility: PropTypes.string,
    receiveNotifications: PropTypes.bool,
  }),
  provider: PropTypes.string,
  showNotification: PropTypes.func.isRequired,
  tab: PropTypes.string.isRequired,
  validateUsername: PropTypes.func.isRequired,

  onAvatarUpload: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default Settings;
