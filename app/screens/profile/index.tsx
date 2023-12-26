import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import styles from './styles';
import { labels } from '@constants/strings';
import { IState } from '@models/reducers/state';
import useOrientation from '@hooks/orientation';
import Screen from '@components/screen';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const ProfileScreen: React.FC = () => {
  const getComputedResponsiveStyles = () => ({
    container: { paddingHorizontal: wp(3), paddingVertical: hp(2) },
    titleText: { fontSize: wp(5) },
  });

  const [responsiveStyles, setResponsiveStyles] = useState(
    getComputedResponsiveStyles(),
  );

  const { username } = useSelector((state: IState) => state.auth);

  const { screenOrientation } = useOrientation();

  useEffect(
    () => setResponsiveStyles(getComputedResponsiveStyles()),
    [screenOrientation],
  );

  return (
    <Screen style={[styles.container, responsiveStyles.container]}>
      <Text style={responsiveStyles.titleText}>
        {labels.welcome} {username}
      </Text>
    </Screen>
  );
};

export default ProfileScreen;
