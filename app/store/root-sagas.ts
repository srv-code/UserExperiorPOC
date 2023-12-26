import { all, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST } from './auth/action-types';
import { NOTIF_FETCH_REQUEST } from './notif/action-types';
import { loginAsync } from './auth/sagas';
import { fetchNotificationsAsync } from './notif/sagas';

function* rootSagas() {
  yield all([
    takeLatest(LOGIN_REQUEST, loginAsync),
    takeLatest(NOTIF_FETCH_REQUEST, fetchNotificationsAsync),
  ]);
}

export default rootSagas;
