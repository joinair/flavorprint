
import { StyleSheet } from 'react-native';

import assign from 'lodash/assign';
import map from 'lodash/map';
import merge from 'lodash/merge';
import reduce from 'lodash/reduce';

import {
  BORDER_RADIUS,
  COLOR_BROCCOLI,
  COLOR_BROCCOLI_ACTIVE,
  COLOR_BUTTON_DISABLED,
  COLOR_PAPRIKA,
  COLOR_PAPRIKA_ACTIVE,
} from 'constants/Styles';

const colors = {
  '': { main: COLOR_BROCCOLI, active: COLOR_BROCCOLI_ACTIVE },
  danger: { main: COLOR_PAPRIKA, active: COLOR_PAPRIKA_ACTIVE },
  facebook: { main: '#437DC5', active: '#3364A1' },
  grey: { main: '#B3B3B3', active: '#454545', textMain: '#454545', textActive: '#000000' },
  white: { main: 'white', active: 'rgba(255,255,255,.7)', textMain: 'white', textActive: 'white' },
};

const colorsStyles = reduce(map(colors, (info, color) => ({
  [`button${color}`]: {
    backgroundColor: info.main,
  },

  [`button${color}__isPressed`]: {
    backgroundColor: info.active,
  },

  [`button${color}Outline`]: {
    backgroundColor: 'transparent',
    borderColor: info.main,
    borderWidth: 1,
  },

  [`button${color}Outline__isPressed`]: {
    backgroundColor: 'transparent',
    borderColor: info.active,
  },

  [`text${color}Outline`]: {
    color: info.textMain || info.main,
  },

  [`text${color}Outline__isPressed`]: {
    color: info.textActive || info.active,
  },

  [`icon${color}Outline`]: {
    tintColor: info.main,
  },

  [`icon${color}Outline__isPressed`]: {
    tintColor: info.active,
  },
})), assign, {});

const sizes = {
  small: { fontSize: 14, lineHeight: 17, paddingHor: 7, height: 22 },
  normal: { fontSize: 15, lineHeight: 18, paddingHor: 14, height: 34 },
  large: { fontSize: 16, lineHeight: 18, paddingHor: 18, height: 46 },
  xLarge: { fontSize: 20, lineHeight: 23, paddingHor: 18, height: 50 },
};

const sizesStyles = reduce(map(sizes, (info, size) => ({
  [`button__${size}`]: {
    height: info.height,
    paddingLeft: info.paddingHor,
    paddingRight: info.paddingHor,
  },

  [`text__${size}`]: {
    lineHeight: info.lineHeight,
    height: info.lineHeight,
    fontSize: info.fontSize,
  },
})), assign, {});

const common = {
  button: {
    borderRadius: BORDER_RADIUS,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button__disabled: {
    backgroundColor: COLOR_BUTTON_DISABLED,
    borderWidth: 0,
  },

  button__noBorder: {
    borderWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: 'white',
  },

  text__disabled: {
    color: 'white',
  },

  icon: {
    marginRight: 7,
  },
};

export default StyleSheet.create(
  merge(common, colorsStyles, sizesStyles)
);
