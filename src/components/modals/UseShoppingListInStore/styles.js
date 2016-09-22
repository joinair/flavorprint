
import { StyleSheet } from 'react-native';

export const HEIGHT = 72;
export const HEIGHT_WITH_ERROR = 87;

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },

  form: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    height: HEIGHT,
  },

  inputContainer: {
    marginRight: 10,
    flex: 1,
  },

  button: {
    height: 42,
  },
});
