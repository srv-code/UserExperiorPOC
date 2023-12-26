import { Notification } from '../reducers/notif';

interface INotifAPIResponse {
  lastFetchedOn: Date;
  list: Notification[];
}

export type { INotifAPIResponse };
