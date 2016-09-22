
import { StyleSheet } from 'react-native';

import {
  COLOR_BORDER,
  COLOR_FONT_SECONDARY,
  COLOR_FONT_INVERTED,
  COLOR_BROCCOLI,
} from 'constants/Styles';

export const ITEM_HEIGHT = 58;
export const HIDDEN_CONTROL_WIDTH = 80;
export const HIDDEN_ROW_WIDTH = HIDDEN_CONTROL_WIDTH * 2;

export const COLOR_ITEM_ACTIVE = '#CFCFCF';
export const COLOR_HIDDEN_CONTROL_ACTIVE = '#333';

export default StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
  },

  listView: {
    flex: 1,
  },

  item: {
    height: ITEM_HEIGHT,
    backgroundColor: 'white',
  },

  item__active: {
  },

  itemContainer: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLOR_BORDER,
    overflow: 'hidden',
  },

  itemName: {
    fontSize: 17,
  },

  itemName__active: {
    fontWeight: 'bold',
  },

  itemNum: {
    fontSize: 11,
    color: COLOR_FONT_SECONDARY,
    marginTop: 5,
    marginLeft: 5,
  },

  itemDotContainer: {
    position: 'absolute',
    left: 10,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemDot: {
    backgroundColor: COLOR_BROCCOLI,
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  hiddenRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },

  hiddenControl: {
    width: HIDDEN_CONTROL_WIDTH,
    backgroundColor: '#454545',
    alignItems: 'center',
    justifyContent: 'center',
  },

  hiddenControlContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  hiddenControlIcon: {
    tintColor: COLOR_FONT_INVERTED,
    marginBottom: 5,
  },

  hiddenControlText: {
    color: COLOR_FONT_INVERTED,
    fontSize: 13,
  },

  input: {
    height: ITEM_HEIGHT,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderColor: COLOR_BORDER,
    borderRadius: 0,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: 'transparent',
  },

  edit: {
    flex: 1,
  },

  editRed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFEEEE',
  },

  editor: {
    backgroundColor: 'white',
  },
});
