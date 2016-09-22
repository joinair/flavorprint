
import { StyleSheet } from 'react-native';

import {
  BORDER_RADIUS,
  COLOR_FONT_DEFAULT,
  COLOR_FONT_SECONDARY,
  COLOR_INPUT_BORDER,
  COLOR_INPUT_ERROR_BORDER,
  COLOR_INPUT_ERROR_TEXT,
  COLOR_INPUT_FOCUS_BORDER,
} from 'constants/Styles';

const INPUT_HEIGHT = 42;
const MULTILINE_HEIGHT = 100;

export default StyleSheet.create({
  main: {
    flex: 1,
    height: INPUT_HEIGHT,
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: COLOR_INPUT_BORDER,
    paddingLeft: 10,
    paddingRight: 10,

    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  main__focus: {
    borderColor: COLOR_INPUT_FOCUS_BORDER,
  },

  main__error: {
    borderColor: COLOR_INPUT_ERROR_BORDER,
  },

  main__multiline: {
    height: MULTILINE_HEIGHT,
  },

  main__search: {
    borderRadius: (INPUT_HEIGHT / 2),
    paddingLeft: 15,
    paddingRight: 15,
  },

  inputWrapper: {
    flex: 1,
    alignItems: 'stretch',
  },

  input: {
    flex: 1,
    fontFamily: 'Circular-Book',
    fontSize: 16,
    lineHeight: 21,
    height: INPUT_HEIGHT,
    color: COLOR_FONT_DEFAULT,
    margin: 0,
  },

  input__multiline: {
    paddingTop: 7,
    height: MULTILINE_HEIGHT,
  },

  error: {
    marginTop: 6,
    color: COLOR_INPUT_ERROR_TEXT,
    fontSize: 13,
  },

  error__always: {
    marginBottom: 6,
  },

  icon: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  leftIcon: {
    marginLeft: 0,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  prefix: {
    color: COLOR_FONT_SECONDARY,
    marginRight: 5,
  },
});
