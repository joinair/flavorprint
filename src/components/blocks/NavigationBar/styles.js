
import { StyleSheet } from 'react-native';

import {
  COLOR_BORDER,
  COLOR_BROCCOLI,
  COLOR_FONT_DEFAULT,
  COLOR_MODAL_HEADER,
} from 'constants/Styles';

import platformPick from 'helpers/platformPick';

export { COLOR_MODAL_HEADER } from 'constants/Styles';

export const NAVBAR_HEIGHT = platformPick({ ios: 64, android: 44 });
export const NAVBAR_PADDING = platformPick({ ios: 20, android: 0 });

export default StyleSheet.create({
  main: {
    backgroundColor: COLOR_BROCCOLI,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

    height: NAVBAR_HEIGHT,
    paddingTop: NAVBAR_PADDING,
  },

  main__modal: {
    backgroundColor: COLOR_MODAL_HEADER,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_BORDER,
  },

  main__noIosPadding: {
    paddingTop: 0,
    height: NAVBAR_HEIGHT - NAVBAR_PADDING,
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  center__fixed: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },

  title: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  title__modal: {
    color: COLOR_FONT_DEFAULT,
  },

  back: {
    paddingLeft: 10,
    paddingRight: 10,
    height: NAVBAR_HEIGHT - NAVBAR_PADDING,
    justifyContent: 'center',
  },

  back__modal: {
    tintColor: COLOR_FONT_DEFAULT,
  },

  iconButton: {
    paddingLeft: 10,
    paddingRight: 10,
    height: NAVBAR_HEIGHT - NAVBAR_PADDING,
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },

  iconButtonImage: {
    tintColor: 'white',
  },

  buttonContainer: {
    height: NAVBAR_HEIGHT - NAVBAR_PADDING,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    borderWidth: 1,
    borderColor: 'white',
  },

  buttonText: {
    fontSize: 17,
  },

  left__invisible: {
    opacity: 0,
  },

  right__invisible: {
    opacity: 0,
  },
});
