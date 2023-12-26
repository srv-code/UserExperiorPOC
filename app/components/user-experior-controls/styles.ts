import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  button: {
    marginVertical: hp(0.5),
  },
  container: {
    borderRadius: hp(1),
    overflow: 'hidden',
    backgroundColor: 'lightgray',
  },
  contentContainer: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
  },
});

export default styles;
