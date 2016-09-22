
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 15,
  },

  separator: {
    width: 27,
  },

  statType: {
    flex: 1,
    alignSelf: 'center',
    color: '#a0abae',
    fontSize: 14,
  },

  statValue: {
    flex: 1,
    alignSelf: 'center',
    color: '#373a3d',
    fontSize: 18,
  },
});
