
import { StyleSheet } from 'react-native';

import {
  COLOR_BORDER,
  COLOR_BOTTOM_MENU,
  COLOR_BOTTOM_MENU_ITEM,
} from 'constants/Styles';

export default StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
  },

  content: {
    flex: 1,
  },

  menu: {
    height: 53,
    backgroundColor: COLOR_BOTTOM_MENU,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    borderTopWidth: 1,
    borderTopColor: COLOR_BORDER,
  },

  menuSeparator: {
    width: 1,
    backgroundColor: COLOR_BOTTOM_MENU_ITEM,
  },
});
