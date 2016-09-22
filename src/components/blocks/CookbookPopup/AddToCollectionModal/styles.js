
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main: {
    flex: 1,
  },

  fixedHeight: {
    height: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  header: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
    fontWeight: 'bold',
  },

  body: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#C7C7C7',
  },

  close: {
    height: 20,
  },

  collTouchable: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },

  collMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  collText: {
    flex: 1,
    marginLeft: 7,
    fontSize: 16,
  },

  newColl: {
    height: 40,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },

  input: {
    height: 40,
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingLeft: 15,
    paddingRight: 15,
  },

  inputIcon: {
    tintColor: '#4D4D4D',
  },

  listView: {
    marginTop: 10,
  },
});
