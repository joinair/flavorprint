
import { StyleSheet } from 'react-native';

import { COLOR_FEED_BACKGROUND } from 'constants/Styles';
import { NAVBAR_PADDING } from 'components/blocks/NavigationBar/styles';

export default StyleSheet.create({
  main: {
    flex: 1,
  },

  body: {
    marginTop: -NAVBAR_PADDING,
    backgroundColor: 'white',
  },

  description: {
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },

  recipePageTitle: {
    textAlign: 'center',
    color: '#373A3D',
    fontSize: 22,
    marginBottom: 15,
    marginTop: 15,
  },

  ingredientsSection: {
    backgroundColor: COLOR_FEED_BACKGROUND,
    paddingTop: 10,
    paddingBottom: 20,
    marginLeft: -10,
    marginRight: -10,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
  },

  ingredientsTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
  },

  alternativeRecipesTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
  },

  saveRecipeContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
