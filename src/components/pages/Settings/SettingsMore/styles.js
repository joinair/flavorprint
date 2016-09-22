
import { StyleSheet } from 'react-native';

import { COLOR_BORDER, COLOR_FONT_SECONDARY } from 'constants/Styles';

export default StyleSheet.create({
  row: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_BORDER,
    flexDirection: 'row',
  },

  rowText: {
    flex: 1,
  },

  rowText__static: {
    color: COLOR_FONT_SECONDARY,
  },

  rowImage: {
  },

  footer: {
    padding: 10,
  },
});
