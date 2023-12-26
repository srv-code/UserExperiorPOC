import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native-paper';
import styles from './styles';
import { labels } from '@constants/strings';
import useOrientation from '@hooks/orientation';
import Screen from '@components/screen';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const ForgotPasswordScreen: React.FC = ({ navigation, route }) => {
  const { username } = route.params;

  const getComputedResponsiveStyles = () => ({
    container: { paddingHorizontal: wp(3), paddingVertical: hp(2) },
    buttonText: { fontSize: wp(3.5) },
    smallText: { marginBottom: hp(2), fontSize: wp(4) },
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
      {username.trim() !== '' && (
        <Text style={responsiveStyles.smallText}>
          Reset for user {username}
        </Text>
      )}
      <Button
        icon="keyboard-backspace"
        uppercase={false}
        mode="outlined"
        labelStyle={responsiveStyles.buttonText}
        onPress={navigation.goBack}>
        {labels.goBack}
      </Button>
    </Screen>
  );
};

export default ForgotPasswordScreen;
