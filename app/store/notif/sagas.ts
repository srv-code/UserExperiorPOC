import { put, call, delay } from 'redux-saga/effects';
import { fetchNotifications } from '@services/notif';
import { labels } from '@constants/strings';
import { INotifFetchRequestAction } from '@models/actions/notif';
import {
  disableLoader,
  enableLoader,
  onFetchNotificationSuccess,
  onFetchNotificationFailure,
} from './actions';

function* fetchNotificationsAsync({
  payload: { userToken },
}: INotifFetchRequestAction) {
  try {
    yield put(enableLoader());
    /* NOTE: How to call API */
    // const response = yield call(fetchNotifications, userToken);

    yield delay(2000); /* NOTE: Emulating network latency */

    /* NOTE: Dummy API response */
    const response =
      userToken === 'Xgs3a34uyd234nf6kg'
        ? {
            success: true,
            data: {
              lastFetchedOn: new Date(),
              list: new Array(Math.floor(Math.random() * 10 + 1))
                .fill('x')
                .map((_, index) => ({
                  id: 'N' + index + 1,
                  text: 'This is a dummy notification ' + index + 1,
                })),
            },
          }
        : {
            success: false,
            error: 'Invalid user token',
          };

    if (!response.success) throw new Error(response.error);

    yield put(onFetchNotificationSuccess(response.data!));
  } catch (error: any) {
    yield put(onFetchNotificationFailure(error.message || 'Unknow reason'));
  } finally {
    yield put(disableLoader());
  }
}

export { fetchNotificationsAsync };
