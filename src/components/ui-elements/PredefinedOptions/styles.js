
import { StyleSheet } from 'react-native';

import { COLOR_FONT_SECONDARY } from 'constants/Styles';

export default StyleSheet.create({
  heading: {
    color: COLOR_FONT_SECONDARY,
    marginBottom: 15,
  },

  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
  },

  button: {
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 17,
  },
});
