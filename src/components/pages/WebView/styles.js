
import { StyleSheet } from 'react-native';

import {
  COLOR_BORDER,
  COLOR_MODAL_HEADER,
  COLOR_BROCCOLI,
  COLOR_BROCCOLI_ACTIVE,
} from 'constants/Styles';

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },

  webView: {
    flex: 1,
  },

  bottomBar: {
    backgroundColor: COLOR_MODAL_HEADER,
    borderTopWidth: 1,
    borderTopColor: COLOR_BORDER,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomBarSeparator: {
    flex: 1,
  },

  control: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },

  controlIcon: {
    marginRight: 0,
  },

  controlIcon__normal: {
    tintColor: COLOR_BROCCOLI,
  },

  controlIcon__disabled: {
    tintColor: 'rgba(0,0,0,.2)',
  },

  controlIcon__isPressed: {
    tintColor: COLOR_BROCCOLI_ACTIVE,
  },
});
