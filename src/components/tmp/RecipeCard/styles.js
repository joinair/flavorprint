
import { StyleSheet, Dimensions } from 'react-native';

import { COLOR_FONT_DEFAULT, COLOR_FONT_SECONDARY } from 'constants/Styles';

const { width, height } = Dimensions.get('window');
const limit = Math.min(width, height);

export const IMAGE_WIDTH = limit <= 320 ? 275 : 320;
export const IMAGE_HEIGHT = IMAGE_WIDTH;
export const UNDERLAY_COLOR = '#FFFFFF';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: 'white',
    width: IMAGE_WIDTH,
  },

  containerShadow: {
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      height: 3,
      width: 1,
    },
    elevation: 5,
  },

  overflowContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    borderRadius: 5,
    overflow: 'hidden',
  },

  bottomContainer: {
    flex: 1,
  },

  image: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },

  description: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 20,
  },

  name: {
    fontSize: 17,
    color: COLOR_FONT_DEFAULT,
    marginBottom: 6,
  },

  publisher: {
    fontSize: 13,
    color: COLOR_FONT_SECONDARY,
  },

  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },

  iconSaved: {
    tintColor: '#F74C4C',
  },

  iconUnsaved: {
    tintColor: '#CFCFCF',
  },

  recomendation: {
    height: 35,
    position: 'absolute',
    top: 15,
    left: 0,
    overflow: 'hidden',
    paddingRight: 10,
  },

  recomendationContainer: {
    backgroundColor: 'white',
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
  },

  recomendationIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginLeft: 10,
    marginRight: 15,
  },

  recomendationText: {
    fontSize: 16,
  },

  recomendationTriangle: {
    position: 'absolute',
    top: -10,
    right: 4,
    backgroundColor: 'white',
    width: 10,
    height: 30,
    transform: [
      { rotateZ: '30deg' },
    ],
  },

  recomendationTriangleBottom: {
    position: 'absolute',
    bottom: -10,
    right: 4,
    backgroundColor: 'white',
    width: 10,
    height: 30,
    transform: [
      { rotateZ: '-30deg' },
    ],
  },

  recomendationDinnersIcon: { tintColor: '#A753C5' },
  recomendationEasyDinnersIcon: { tintColor: '#F74C4C' },
  recomendationHealthyIcon: { tintColor: '#3ABA5A' },
  recomendationTrendingIcon: { tintColor: '#57D7E6' },

  placeholder: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  placeholderIcon: {
    tintColor: '#e0e0e0',
  },
});
