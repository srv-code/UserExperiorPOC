import { createReducer } from '@utils/redux';
import {
  NOTIF_FETCH_REQUEST,
  NOTIF_FETCH_RESPONSE,
  NOTIF_FETCH_ERROR,
} from '@store/notif/action-types';
import { INotifState } from '@models/reducers/notif';
import {
  INotifFetchFailureAction,
  INotifFetchRequestAction,
  INotifFetchSuccessAction,
} from '@models/actions/notif';

const initialState: INotifState = {
  list: [],
};

const notificationReducer = createReducer(initialState, {
  [NOTIF_FETCH_REQUEST]: (
    state: INotifState,
    { payload: { userToken } }: INotifFetchRequestAction,
  ): INotifState => ({ ...state, userToken, error: undefined }),

  [NOTIF_FETCH_RESPONSE]: (
    state: INotifState,
    { payload: { lastFetchedOn, list } }: INotifFetchSuccessAction,
  ): INotifState => ({ ...state, lastFetchedOn, list, error: undefined }),

  [NOTIF_FETCH_ERROR]: (
    state: INotifState,
    { payload }: INotifFetchFailureAction,
  ): INotifState => ({ ...state, error: payload }),
});

export default notificationReducer;
