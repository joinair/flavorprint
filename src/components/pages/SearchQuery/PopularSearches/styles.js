
import { StyleSheet } from 'react-native';

import {
  COLOR_FONT_SECONDARY,
  COLOR_FONT_DEFAULT,
  COLOR_BORDER,
} from 'constants/Styles';

export default StyleSheet.create({
  item: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLOR_BORDER,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },

  itemText: {
    fontSize: 16,
  },

  itemCustomText: {
    flex: 1,
  },

  itemAccentText: {
    fontWeight: 'bold',
  },

  itemIcon: {
    tintColor: COLOR_FONT_DEFAULT,
  },

  header: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    color: COLOR_FONT_SECONDARY,
  },
});
