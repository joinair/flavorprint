
import { StyleSheet } from 'react-native';

import { COLOR_FONT_SECONDARY } from 'constants/Styles';

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },

  inputContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    marginBottom: 10,
  },

  inputIcon: {
    tintColor: COLOR_FONT_SECONDARY,
  },
});
