
import { StyleSheet } from 'react-native';

import {
  COLOR_BROCCOLI,
  COLOR_FONT_DEFAULT,
  COLOR_FEED_BACKGROUND,
} from 'constants/Styles';

export default StyleSheet.create({
  main: {
    flex: 1,
  },

  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,.1)',
    backgroundColor: '#F7F7F7',
  },

  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 15,
    height: 45,
    borderBottomWidth: 5,
    borderBottomColor: 'transparent',
  },

  tab__selected: {
    borderBottomColor: COLOR_BROCCOLI,
  },

  tabText: {
    color: COLOR_FONT_DEFAULT,
    fontSize: 20,
  },

  tabText__selected: {
    color: COLOR_BROCCOLI,
  },

  formHorizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },

  formHorizontalInput: {
    flex: 1,
  },

  separatorHor: {
    height: 1,
    backgroundColor: '#EBEBEB',
    marginTop: 18,
    marginBottom: 16,
  },

  separatorVer: {
    width: 9,
  },

  spaceHor: {
    height: 20,
  },

  title: {
    marginTop: 7,
    marginBottom: 7,
    color: COLOR_FONT_DEFAULT,
    fontSize: 16,
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },

  greyArea: {
    backgroundColor: COLOR_FEED_BACKGROUND,
    marginLeft: -10,
    marginRight: -10,
    paddingLeft: 10,
    paddingRight: 10,
  },

  checkboxArea: {
    marginTop: 10,
  },

  notice: {
    color: COLOR_BROCCOLI,
    marginBottom: 10,
  },

  verticalButton: {
    flexDirection: 'row',
  },

  checkbox: {
    marginRight: 10,
  },

  email: {
    height: 28,
    justifyContent: 'center',
  },

  emailText: {
    fontSize: 16,
  },

  usernameText: {
    marginTop: 7,
  },

  usernameUrlText: {
    color: COLOR_BROCCOLI,
  },

  verticalButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  forgotPassword: {
    marginBottom: 10,
  },
});
