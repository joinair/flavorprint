
import { StyleSheet } from 'react-native';

import { COLOR_BROCCOLI, COLOR_GRAY_500 } from 'constants/Styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    position: 'absolute',
  },

  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    height: 55,
    tintColor: COLOR_BROCCOLI,
    width: 153,
    marginBottom: 54,
  },

  title: {
    color: COLOR_GRAY_500,
    fontSize: 27,
    letterSpacing: 0,
    marginBottom: 9,
  },

  subtitle: {
    color: COLOR_GRAY_500,
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 24,
    textAlign: 'center',
    width: 280,
    marginBottom: 56,
  },

  button: {
    width: 178,
  },
});
