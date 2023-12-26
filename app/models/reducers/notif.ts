type Notification = {
  id: string;
  text: string;
};

interface INotifState {
  userToken?: string;
  lastFetchedOn?: Date;
  list: Notification[];
  error?: string;
}

export type { INotifState, Notification };
