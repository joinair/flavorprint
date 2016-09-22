
import { StyleSheet } from 'react-native';

import {
  COLOR_FONT_DEFAULT,
  COLOR_BORDER,
  BORDER_RADIUS,
} from 'constants/Styles';

export default StyleSheet.create({
  popup: {
    marginTop: 10,

    borderRadius: BORDER_RADIUS,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLOR_BORDER,

    elevation: 8,

    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },

  item: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },

  itemText: {
    color: COLOR_FONT_DEFAULT,
  },
});
