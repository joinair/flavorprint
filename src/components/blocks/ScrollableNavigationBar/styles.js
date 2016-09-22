
import { StyleSheet } from 'react-native';

import {
  COLOR_BROCCOLI,
  COLOR_MODAL_HEADER,
} from 'constants/Styles';

import { NAVBAR_HEIGHT, NAVBAR_PADDING } from 'components/blocks/NavigationBar/styles';
export { NAVBAR_HEIGHT } from 'components/blocks/NavigationBar/styles';

export default StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: NAVBAR_PADDING,
  },

  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  header: {
    paddingTop: NAVBAR_HEIGHT,
  },

  thinline: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: NAVBAR_PADDING,
    backgroundColor: COLOR_BROCCOLI,
  },

  thinline__default: {
    backgroundColor: COLOR_BROCCOLI,
  },

  thinline__modal: {
    backgroundColor: COLOR_MODAL_HEADER,
  },
});
