
import { StyleSheet } from 'react-native';

import { COLOR_BROCCOLI } from 'constants/Styles';

export default StyleSheet.create({
  main: {
    width: 60,
  },

  touchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    textAlign: 'center',
    color: '#707070',
    fontSize: 12,
  },

  textActive: {
    color: COLOR_BROCCOLI,
  },

  icon: {
    tintColor: '#C7C7C7',
  },

  iconActive: {
    tintColor: COLOR_BROCCOLI,
  },

  imageContainer: {
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  count: {
    position: 'absolute',
    top: 2,
    right: 8,
    backgroundColor: '#F74C4C',
    height: 15,
    width: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  countText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 12,
  },
});

