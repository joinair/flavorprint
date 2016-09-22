
import { StyleSheet } from 'react-native';

import {
  COLOR_FACEBOOK,
  COLOR_FACEBOOK_DARKER,
  COLOR_TWITTER,
  COLOR_TWITTER_DARKER,
  COLOR_GPLUS,
  COLOR_GPLUS_DARKER,
  COLOR_PINTEREST,
  COLOR_PINTEREST_DARKER,
} from 'constants/Styles';

export default StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  buttonIcon: {
    marginRight: 0,
  },

  button__facebook: { backgroundColor: COLOR_FACEBOOK },
  button__facebookPressed: { backgroundColor: COLOR_FACEBOOK_DARKER },
  button__twitter: { backgroundColor: COLOR_TWITTER },
  button__twitterPressed: { backgroundColor: COLOR_TWITTER_DARKER },
  button__gplus: { backgroundColor: COLOR_GPLUS },
  button__gplusPressed: { backgroundColor: COLOR_GPLUS_DARKER },
  button__pinterest: { backgroundColor: COLOR_PINTEREST },
  button__pinterestPressed: { backgroundColor: COLOR_PINTEREST_DARKER },

  separator: {
    width: 10,
  },
});
