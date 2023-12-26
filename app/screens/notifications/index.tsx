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
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '@store/notif/actions';
import { IState } from '@models/reducers/state';
import { View } from 'react-native';
import { showSnackMessage } from '@utils/alerts';

const NotificationScreen: React.FC = () => {
  const {
    auth: { token },
    notif: { list, lastFetchedOn, error },
    loading: { isFetchingNotifications },
  } = useSelector((state: IState) => state);

  const getComputedResponsiveStyles = () => ({
    container: { paddingHorizontal: wp(3), paddingVertical: hp(2) },
    titleText: { fontSize: wp(8), marginBottom: hp(1) },
    subText: { fontSize: wp(3), width: wp('80%') },
    countText: { fontSize: wp(4.5) },
    fetchOnText: { fontSize: wp(3) },
    notifDataContainer: { marginTop: hp(1), width: wp('80%') },
    buttonText: { fontSize: wp(3.5) },
    fetchButton: { marginVertical: hp(2) },
  });

  const [responsiveStyles, setResponsiveStyles] = useState(
    getComputedResponsiveStyles(),
  );

  const { screenOrientation } = useOrientation();

  useEffect(
    () => setResponsiveStyles(getComputedResponsiveStyles()),
    [screenOrientation],
  );

  useEffect(() => {
    if (error)
      showSnackMessage(`${labels.notifFetchFailed}: ${error}`, true, true);
  }, [error]);

  const dispatch = useDispatch();

  const onFetchNotifs = () => dispatch(fetchNotifications(token!));

  return (
    <Screen style={[styles.container, responsiveStyles.container]}>
      <Text style={[styles.titleText, responsiveStyles.titleText]}>
        {labels.notifications}
      </Text>
      <Text style={[styles.subText, responsiveStyles.subText]}>
        {labels.notificationContent}
      </Text>

      <View style={[responsiveStyles.notifDataContainer]}>
        <Text style={[styles.countText, responsiveStyles.countText]}>
          {list.length || 'No'} {labels.notifications}
        </Text>
        <Text style={[styles.fetchOnText, responsiveStyles.fetchOnText]}>
          {labels.lastFetchedOn}: {lastFetchedOn?.toString() || 'Never'}
        </Text>
      </View>

      <Button
        icon="logout"
        uppercase={false}
        mode="outlined"
        loading={isFetchingNotifications}
        disabled={isFetchingNotifications}
        labelStyle={responsiveStyles.buttonText}
        style={responsiveStyles.fetchButton}
        onPress={onFetchNotifs}>
        {labels.fetch}
      </Button>
    </Screen>
  );
};

export default NotificationScreen;
