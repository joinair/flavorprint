
import { StyleSheet } from 'react-native';

import { COLOR_BROCCOLI } from 'constants/Styles';
import { NAVBAR_HEIGHT, NAVBAR_PADDING } from 'components/blocks/NavigationBar/styles';

export default StyleSheet.create({
  main: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },

  statusBar: {
    height: 20,
    backgroundColor: '#E9ECEE',
  },

  container: {
    alignSelf: 'stretch',
  },

  button: {
    height: 42,
    marginBottom: 25,
  },

  buttonIcon: {
    position: 'absolute',
    left: 0,
  },

  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E7E7E7',
  },

  separatorText: {
    marginLeft: 15,
    marginRight: 15,
    color: '#7D8B94',
    fontSize: 16,
  },

  tabs: {
    backgroundColor: '#E9ECEE',
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderColor: '#E9ECEE',
    borderWidth: 1,
    marginBottom: 25,
    marginLeft: -10,
    marginRight: -10,
    borderBottomColor: '#E7E7E7',
  },

  tab: {
    flex: 1,
    height: NAVBAR_HEIGHT - NAVBAR_PADDING,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabText: {
    color: '#7D8B94',
    fontSize: 16,
  },

  tabText__selected: {
    color: COLOR_BROCCOLI,
  },

  tabTriangleWrapper: {
    position: 'absolute',
    bottom: -7,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  tabTriangle: {
    width: 14,
    height: 14,
    backgroundColor: '#E9ECEE',
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
    borderRightWidth: 1,
    borderRightColor: '#E7E7E7',
    transform: [
      { scaleX: 1.7 },
      { rotateZ: '45deg' },
    ],
  },

  space: {
    width: 25,
    height: 25,
  },

  formHorizontal: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },

  formHorizontalInput: {
    flex: 1,
  },

  forgotPassword: {
    color: COLOR_BROCCOLI,
    marginTop: -20,
    textAlign: 'right',
  },
});
