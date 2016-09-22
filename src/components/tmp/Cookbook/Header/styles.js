
import { StyleSheet } from 'react-native';

import { COLOR_FONT_DEFAULT, COLOR_FONT_SECONDARY } from 'constants/Styles';

import { IMAGE_WIDTH } from 'components/tmp/RecipeCard/styles';

export default StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdown: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 15,
    marginBottom: 15,
    width: IMAGE_WIDTH,
  },

  dropdownText: {
    color: COLOR_FONT_DEFAULT,
    fontSize: 22,
    lineHeight: 25,
    height: 25,
  },

  dropdownCount: {
    color: COLOR_FONT_SECONDARY,
    fontSize: 12,
  },

  dropdownContainer: {
    justifyContent: 'space-between',
  },

  dropdownIcon: {
    marginRight: 0,
  },

  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  footerText: {
    marginTop: 36,
    marginBottom: 42,
    fontSize: 18,
    color: COLOR_FONT_SECONDARY,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
