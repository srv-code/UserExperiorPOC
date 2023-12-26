import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import styles from './styles';
import { labels } from '@constants/strings';
import useOrientation from '@hooks/orientation';
import Screen from '@components/screen';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const AboutScreen: React.FC = () => {
  const getComputedResponsiveStyles = () => ({
    container: { paddingHorizontal: wp(3), paddingVertical: hp(2) },
    titleText: { fontSize: wp(8), marginBottom: hp(1) },
    subText: { fontSize: wp(3), width: wp('80%') },
  });

  const [responsiveStyles, setResponsiveStyles] = useState(
    getComputedResponsiveStyles(),
  );

  const { screenOrientation } = useOrientation();

  useEffect(
    () => setResponsiveStyles(getComputedResponsiveStyles()),
    [screenOrientation],
  );

  return (
    <Screen style={[styles.container, responsiveStyles.container]}>
      <Text style={[styles.titleText, responsiveStyles.titleText]}>
        {labels.about}
      </Text>
      <Text style={[styles.subText, responsiveStyles.subText]}>
        {labels.aboutContent}
      </Text>
    </Screen>
  );
};

export default AboutScreen;
