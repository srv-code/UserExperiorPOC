import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native-paper';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { labels, screenNames } from '@constants/strings';
import { IState } from '@models/reducers/state';
import useOrientation from '@hooks/orientation';
import Screen from '@components/screen';
import { logOut } from '@store/auth/actions';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { fetchNotifications } from '@store/notif/actions';
import Images from '@config/images';
import UserExperiorControls from '@components/user-experior-controls';

const HomeScreen: React.FC = ({ navigation }) => {
  const getComputedResponsiveStyles = () => ({
    container: { paddingHorizontal: wp(3), paddingVertical: hp(2) },
    smallText: { fontSize: wp(4.5), marginBottom: hp(2) },
    helperText: { fontSize: wp(3) },
    buttonText: { fontSize: wp(3.5) },
    button: { marginVertical: hp(0.5) },
    imgLogo: { height: hp(17) },
    imgHome: { size: hp(5) },
  });

  const [responsiveStyles, setResponsiveStyles] = useState(
    getComputedResponsiveStyles(),
  );

  const {
    auth: { token },
    loading: { isFetchingNotifications },
  } = useSelector((state: IState) => state);

  const { screenOrientation } = useOrientation();

  useEffect(
    () => setResponsiveStyles(getComputedResponsiveStyles()),
    [screenOrientation],
  );

  const dispatch = useDispatch();

  const onLogout = () => dispatch(logOut());

  const navigateToProfile = () => navigation.navigate(screenNames.profile);

  const onFetchNotifs = () => dispatch(fetchNotifications(token!));

  const openDrawer = () => navigation.openDrawer();

  return (
    <Screen style={[styles.container, responsiveStyles.container]}>
      <Image
        source={Images.react}
        style={responsiveStyles.imgLogo}
        resizeMode="contain"
      />
      <Images.home
        height={responsiveStyles.imgHome.size}
        width={responsiveStyles.imgHome.size}
      />

      <Text style={responsiveStyles.smallText}>Token: {token}</Text>
      <Text style={[styles.helperText, responsiveStyles.helperText]}>
        ({labels.drawerHelperText})
      </Text>
      <Button
        icon="menu"
        uppercase={false}
        mode="outlined"
        labelStyle={responsiveStyles.buttonText}
        style={responsiveStyles.button}
        onPress={openDrawer}>
        {labels.openDrawer}
      </Button>
      <Button
        uppercase={false}
        mode="outlined"
        labelStyle={responsiveStyles.buttonText}
        style={responsiveStyles.button}
        onPress={navigateToProfile}>
        {labels.viewProfile}
      </Button>
      <Button
        uppercase={false}
        mode="outlined"
        labelStyle={responsiveStyles.buttonText}
        style={responsiveStyles.button}
        loading={isFetchingNotifications}
        disabled={isFetchingNotifications}
        onPress={onFetchNotifs}>
        {labels.fetchNotifs}
      </Button>
      <Button
        icon="logout"
        uppercase={false}
        mode="outlined"
        labelStyle={responsiveStyles.buttonText}
        style={responsiveStyles.button}
        onPress={onLogout}>
        {labels.logout}
      </Button>

      <UserExperiorControls
        style={{ height: '65%' }}
        // elementRef={textInputRef}
      />
    </Screen>
  );
};

export default HomeScreen;
