import { INotifAPIResponse } from '../api/notif';

interface INotifFetchRequestAction {
  type: string;
  payload: { userToken: string };
}

interface INotifFetchSuccessAction {
  type: string;
  payload: INotifAPIResponse;
}

interface INotifFetchFailureAction {
  type: string;
  payload: string;
}

export type {
  INotifFetchRequestAction,
  INotifFetchSuccessAction,
  INotifFetchFailureAction,
};
