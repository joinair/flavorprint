
import { StyleSheet } from 'react-native';

import { COLOR_FONT_DEFAULT } from 'constants/Styles';

export default StyleSheet.create({
  main: {
    flexDirection: 'row',
    padding: 15,
    margin: -15,
    alignItems: 'center',
  },

  label: {
    flex: 1,
    marginLeft: 8,
    color: COLOR_FONT_DEFAULT,
  },
});
