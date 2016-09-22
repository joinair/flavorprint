
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  ingredient: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ingredientText: {
    flex: 1,
    fontSize: 15,
    color: '#4C4C4C',
    paddingLeft: 15,
  },

  ingredientsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  directionsTitle: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
  },

  directionsDescription: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
