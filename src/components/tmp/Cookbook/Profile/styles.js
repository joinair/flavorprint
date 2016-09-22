
import { StyleSheet } from 'react-native';

import { COLOR_FONT_SECONDARY, BORDER_RADIUS, COLOR_BORDER } from 'constants/Styles';

export const AVATAR_WIDTH = 90;
export const AVATAR_HEIGHT = 90;

export default StyleSheet.create({
  main: {
    paddingBottom: 15,
    backgroundColor: 'white',
  },

  avatarContainer: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 14,
    color: COLOR_FONT_SECONDARY,
    textAlign: 'center',
    marginTop: 7,
    marginRight: 20,
    marginLeft: 20,
  },

  shareButtonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  shareIconsContainer: {
    position: 'absolute',
    top: -95,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  shareIcons: {
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: COLOR_BORDER,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    elevation: 8,

    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },

  shareIconsTriangleContainer: {
    position: 'absolute',
    top: -28 + 7,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  shareIconsTriangle: {
    width: 14,
    height: 14,
    backgroundColor: 'white',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: COLOR_BORDER,
    transform: [
      { scaleX: 1.7 },
      { rotateZ: '45deg' },
    ],
  },
});
