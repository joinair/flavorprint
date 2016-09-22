
import { StyleSheet } from 'react-native';

import { COLOR_BORDER } from 'constants/Styles';

export default StyleSheet.create({
  button: {
    marginLeft: 15,
  },

  popup: {
    backgroundColor: 'white',
  },

  popupSort: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
  },

  space: {
    width: 20,
  },

  horizontalLine: {
    height: 1,
    backgroundColor: COLOR_BORDER,
  },

  clearList: {
    margin: 15,
  },
});
