
import { StyleSheet } from 'react-native';

import { COLOR_FEED_BACKGROUND } from 'constants/Styles';

export default StyleSheet.create({
  main: {
    backgroundColor: COLOR_FEED_BACKGROUND,
  },

  listView: {
    flex: 1,
    backgroundColor: COLOR_FEED_BACKGROUND,
  },

  header: {
    height: 25,
  },

  showMore: {
    height: 44,
    flexDirection: 'row',
    backgroundColor: '#3ABA5A',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },

  showMoreText: {
    fontSize: 18,
    color: '#FFFFFF',
    alignSelf: 'center',
  },

  preloader: {
    backgroundColor: 'rgba(255,255,255,.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
