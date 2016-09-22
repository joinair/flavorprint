
import { StyleSheet } from 'react-native';

import {
  COLOR_BROCCOLI,
  BORDER_RADIUS,
  COLOR_FONT_INVERTED,
} from 'constants/Styles';

export default StyleSheet.create({
  popupWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },

  popup: {
    backgroundColor: COLOR_BROCCOLI,
    padding: 10,
    borderRadius: BORDER_RADIUS,

    alignSelf: 'center',
    width: 310,

    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: 'black',
    shadowOpacity: 0.2,

    flexDirection: 'row',
    alignItems: 'center',
  },

  container: {
  },

  popupText: {
    color: COLOR_FONT_INVERTED,
    fontSize: 16,
    fontWeight: 'bold',
  },

  triangleContainer: {
    position: 'absolute',
    bottom: -5,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  triangle: {
    backgroundColor: COLOR_BROCCOLI,
    width: 10,
    height: 10,
    transform: [
      { rotateZ: '45deg' },
    ],
  },

  wide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  button: {
    height: 29,
  },
});
