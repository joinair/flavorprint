
import { StyleSheet } from 'react-native';

import {
  COLOR_NOTIFICATION,
  COLOR_FONT_DEFAULT,
  BORDER_RADIUS,
} from 'constants/Styles';

export default StyleSheet.create({
  main: {
    position: 'absolute',
    bottom: 68,
    left: 0,
    right: 0,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: COLOR_NOTIFICATION,
    borderRadius: BORDER_RADIUS,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      height: 3,
      width: 1,
    },
    elevation: 6,
  },

  text: {
    color: COLOR_FONT_DEFAULT,
    flex: 1,
    marginRight: 10,
    textAlign: 'center',
  },

  icon: {
    marginRight: 0,
    paddingRight: 0,
    tintColor: '#000',
  },
});
