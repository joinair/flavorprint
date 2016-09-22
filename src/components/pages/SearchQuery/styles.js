
import { StyleSheet } from 'react-native';

import { COLOR_FONT_SECONDARY } from 'constants/Styles';

export default StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
  },

  searchInput: {
    borderWidth: 0,
    height: 34,
    borderRadius: 34 / 2,
  },

  searchInputIcon: {
    tintColor: COLOR_FONT_SECONDARY,
  },

  searchInputContainer: {
    flex: 1,
    alignSelf: 'center',
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 10,
    paddingRight: 0,
  },

  searchInputInput: {
    marginRight: -10,
    height: 34,
  },
});
