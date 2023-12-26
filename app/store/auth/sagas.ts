import { put, call, delay } from 'redux-saga/effects';
import { loginUser } from '@services/auth';
import { IAuthRequestAction } from '@models/actions/auth';
import {
  disableLoader,
  enableLoader,
  onLoginFailure,
  onLoginSuccess,
} from './actions';

function* loginAsync({ payload: { username, password } }: IAuthRequestAction) {
  try {
    yield put(enableLoader());
    /* NOTE: How to call API */
    // const response = yield call(loginUser, username, password);

    yield delay(2000); /* NOTE: Emulating network latency */

    /* NOTE: Dummy API response */
    const response =
      username === 'admin' && password === 'Admin@123'
        ? { success: true, user: { token: 'Xgs3a34uyd234nf6kg' } }
        : {
            success: false,
            error:
              username === 'admin' ? 'Invalid credentials' : 'No such user',
          };

    if (!response.success) throw new Error(response.error);

    yield put(onLoginSuccess(response.user!));
  } catch (error: any) {
    yield put(onLoginFailure(error.message || 'Unknown reason'));
  } finally {
    yield put(disableLoader());
  }
}

export { loginAsync };
