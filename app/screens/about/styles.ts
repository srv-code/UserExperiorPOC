import { StyleSheet } from 'react-native';
import AppStyles from '@config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: '600',
  },
  subText: {
    color: AppStyles.colors.GREY,
    textAlign: 'center',
  },
});

export default styles;
