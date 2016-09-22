
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons: {
    marginLeft: 18,
    flex: 1,
  },

  button: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
