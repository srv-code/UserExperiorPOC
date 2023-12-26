import { ILoadingState } from './loading';
import { IAuthState } from './auth';
import { IThemeState } from './theme';
import { INotifState } from './notif';

interface IState {
  auth: IAuthState;
  loading: ILoadingState;
  theme: IThemeState;
  notif: INotifState;
}

export type { IState };
