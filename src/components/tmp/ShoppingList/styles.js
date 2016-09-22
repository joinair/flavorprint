
import { StyleSheet } from 'react-native';

import {
  COLOR_BORDER,
  COLOR_FONT_DEFAULT,
  COLOR_FONT_SECONDARY,
  COLOR_FONT_INVERTED,
  COLOR_FONT_INVERTED_SECONDARY,
} from 'constants/Styles';

export const SWIPE_ACTIONS_RIGHT_WIDTH = 160;
export const SWIPE_UNDERLAY_COLOR = '#454545';

export default StyleSheet.create({
  main: {
    flex: 1,
  },

  mainMenu: {
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainMenuFlex: {
    flex: 1,
  },

  mainContent: {
    flex: 1,
  },

  mainOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,.9)',
  },

  heading: {
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: '#F0F0F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headingTitle: {
    color: COLOR_FONT_DEFAULT,
    flex: 1,
  },

  item: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR_BORDER,
    backgroundColor: 'white',
  },

  itemContent: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 60,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemText: {
    color: COLOR_FONT_DEFAULT,
    flex: 1,
    lineHeight: 21,
    marginLeft: 5,
    fontSize: 14,
  },

  itemActions: {
    backgroundColor: '#454545',
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemActionsTriangle: {
    width: 15,
    height: 15,
    backgroundColor: 'white',
    marginTop: -10,
    marginBottom: -5,
    transform: [
      { rotateZ: '45deg' },
    ],
  },

  headingActionsTriangle: {
    backgroundColor: '#F0F0F0',
  },

  itemActionsButtons: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },

  itemActionsButton: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  itemActionsButtonText: {
    color: COLOR_FONT_INVERTED,
  },

  itemActionsButtonIcon: {
    tintColor: COLOR_FONT_INVERTED,
  },

  itemInputContainer: {
    flex: 1,
  },

  itemInput: {
    paddingTop: 5,
    paddingBottom: 0,
    paddingLeft: 5,
    height: 21,
    borderWidth: 0,
  },

  itemInputText: {
    fontSize: 14,
    height: 21,
  },

  checkedHeading: {
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: '#454545',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  checkedHeadingTitle: {
    color: COLOR_FONT_INVERTED,
    marginLeft: 10,
  },

  checkedHeadingSpace: {
    flex: 1,
  },

  checkedHeadingTitleSecondary: {
    color: COLOR_FONT_INVERTED_SECONDARY,
    marginLeft: 10,
  },

  removeItemButton: {
    marginTop: -8,
    marginBottom: -8,
  },

  autocompleteButton: {
    height: 42,
  },

  autocompleteButtonText: {
    flex: 1,
    color: COLOR_FONT_SECONDARY,
  },

  autocompleteButtonIcon: {
    marginRight: 0,
  },

  itemHidden: {
    flex: 1,
  },

  itemSwipeActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  itemSwipe: {
    width: 80,
    backgroundColor: '#454545',
  },

  itemSwipeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },

  itemSwipeIcon: {
    tintColor: COLOR_FONT_INVERTED,
    marginBottom: 5,
  },

  itemSwipeText: {
    color: COLOR_FONT_INVERTED,
  },
});
