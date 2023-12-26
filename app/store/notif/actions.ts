import {
  NOTIF_FETCH_REQUEST,
  NOTIF_FETCH_ERROR,
  NOTIF_FETCH_RESPONSE,
} from '@store/notif/action-types';
import {
  NOTIF_ENABLE_LOADER,
  NOTIF_DISABLE_LOADER,
} from '@store/loader/action-types';
import {
  INotifFetchFailureAction,
  INotifFetchRequestAction,
  INotifFetchSuccessAction,
} from '@models/actions/notif';
import { INotifAPIResponse } from '@models/api/notif';

const fetchNotifications = (userToken: string): INotifFetchRequestAction => ({
  type: NOTIF_FETCH_REQUEST,
  payload: { userToken },
});

const onFetchNotificationSuccess = (
  response: INotifAPIResponse,
): INotifFetchSuccessAction => ({
  type: NOTIF_FETCH_RESPONSE,
  payload: response,
});

const onFetchNotificationFailure = (
  reason: string,
): INotifFetchFailureAction => ({
  type: NOTIF_FETCH_ERROR,
  payload: reason,
});

const enableLoader = () => ({
  type: NOTIF_ENABLE_LOADER,
});

const disableLoader = () => ({
  type: NOTIF_DISABLE_LOADER,
});

export {
  fetchNotifications,
  onFetchNotificationSuccess,
  onFetchNotificationFailure,
  enableLoader,
  disableLoader,
};
