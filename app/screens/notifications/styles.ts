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
  countText: {
    color: AppStyles.colors.INDIAN_RED,
    textAlign: 'center',
  },
  fetchOnText: {
    color: AppStyles.colors.INDIAN_RED,
    textAlign: 'center',
  },
  subText: {
    color: AppStyles.colors.GREY,
    textAlign: 'center',
  },
});

export default styles;
