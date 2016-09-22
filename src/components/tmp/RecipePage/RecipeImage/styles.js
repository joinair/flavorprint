
import { StyleSheet, Dimensions } from 'react-native';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = 290;

export default StyleSheet.create({
  image: {
    width: WIDTH,
    height: HEIGHT,
  },
});
