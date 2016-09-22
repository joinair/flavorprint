
import { StyleSheet } from 'react-native';

import { COLOR_FONT_SECONDARY } from 'constants/Styles';

export default StyleSheet.create({
  tagList: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },

  addIngredientButton: {
    height: 42,
  },

  addIngredientButtonText: {
    flex: 1,
    color: COLOR_FONT_SECONDARY,
  },

  addIngredientButtonIcon: {
    marginRight: 0,
  },
});
