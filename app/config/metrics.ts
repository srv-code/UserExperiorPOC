/*
 * Platform/Application wide metrics for proper styling
 */
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const Metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 54 : 66,
  isIphoneX:
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812),
};

export default Metrics;
